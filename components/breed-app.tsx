"use client"

import {useRef, useState} from "react"
import * as tf from "@tensorflow/tfjs"
import {HomeScreen} from "@/components/screens/home-screen"
import {CameraScreen} from "@/components/screens/camera-screen"
import {CaptureScreen} from "@/components/screens/capture-screen"
import {BreedResult, ResultsScreen} from "@/components/screens/results-screen"
import {LoadingScreen} from "@/components/screens/loading-screen"
import {breeds} from "@/lib/breeds"

type AppScreen = "home" | "camera" | "capture" | "loading" | "results"

export function BreedApp() {
    const [currentScreen, setCurrentScreen] = useState<AppScreen>("home")
    const [capturedImage, setCapturedImage] = useState<string>("")
    const [results, setResults] = useState<BreedResult[]>([])

    const modelRef = useRef<tf.GraphModel | null>(null)
    const BREED_INDEX_MAP = Object.keys(breeds);
    const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

    const handleStart = () => setCurrentScreen("camera")
    const handleCapture = (imageData: string) => {
        setCapturedImage(imageData)
        setCurrentScreen("camera")
        setCurrentScreen("capture")
    }

    const handleRetake = () => {
        setCapturedImage("")
        setCurrentScreen("camera")
    }

    const handleDiscover = async () => {
        setCurrentScreen("loading")

        try {
            // 1. Load the model
            if (!modelRef.current) {
                modelRef.current = await tf.loadGraphModel(`${publicBasePath}/models/model.json`)
            }

            // 2. Prepare the image
            const img = new Image()
            img.src = capturedImage
            await new Promise((resolve) => (img.onload = resolve))

            // 3. Run prediction and process results
            const { sortedResults, topProbability } = await (async () => {
                const tensor = tf.tidy(() => {
                    return tf.browser.fromPixels(img)
                        .resizeBilinear([224, 224])
                        .expandDims(0)
                        .toFloat();
                });

                const prediction = modelRef.current!.predict(tensor) as tf.Tensor;
                const data = await prediction.data(); // Transfer the data from GPU memory to CPU memory

                tensor.dispose();
                prediction.dispose();

                const allResults = Array.from(data).map((prob, i) => ({
                    breed: BREED_INDEX_MAP[i],
                    probability: Math.round(prob * 100),
                }));

                const sorted = allResults
                    .sort((a, b) => b.probability - a.probability)
                    .slice(0, 4);

                return { sortedResults: sorted, topProbability: sorted[0].probability };
            })();

            // 4. Confidence check (if it is below 15%, it is probably not a dog)
            if (topProbability < 15) {
                setResults([])
            } else {
                // Map to the format expected by ResultsScreen
                const formattedResults = sortedResults.map(res => ({
                    breed: `breed.${res.breed}`,
                    probability: res.probability
                }));
                setResults(formattedResults)
            }

            setCurrentScreen("results")

        } catch (error) {
            console.error("Prediction error:", error)
            setCurrentScreen("results")
        }
    }

    const handleTryAgain = () => {
        setCapturedImage("")
        setResults([])
        setCurrentScreen("camera")
    }

    const handleBackHome = () => {
        setCapturedImage("")
        setResults([])
        setCurrentScreen("home")
    }

    const handleBack = () => {
        if (currentScreen === "camera") setCurrentScreen("home")
        else if (currentScreen === "capture") {
            setCurrentScreen("camera")
            setCapturedImage("")
        }
    }

    // Render screens using the same logic
    switch (currentScreen) {
        case "home": return <HomeScreen onStart={handleStart}/>
        case "camera": return <CameraScreen onCapture={handleCapture} onBack={handleBack}/>
        case "capture": return (
            <CaptureScreen
                imageData={capturedImage}
                onRetake={handleRetake}
                onDiscover={handleDiscover}
                onBack={handleBack}
            />
        )
        case "loading": return <LoadingScreen/>
        case "results": return (
            <ResultsScreen
                imageData={capturedImage}
                results={results}
                onTryAgain={handleTryAgain}
                onBackHome={handleBackHome}
            />
        )
        default: return <HomeScreen onStart={handleStart}/>
    }
}