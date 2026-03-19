"use client"

import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react"
import {AlertCircle, Camera, ImageIcon} from "lucide-react"
import {useI18n} from "@/lib/i18n"
import {LanguageSelector} from "@/components/ui/language-selector"
import {GoBackButton} from "@/components/ui/go-back-button"

type CameraScreenProps = {
    onCapture: (imageData: string) => void
    onBack: () => void
}

type PermissionState = "prompt" | "granted" | "denied" | "error"

export function CameraScreen({onCapture, onBack}: CameraScreenProps) {
    const {t} = useI18n()
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const streamRef = useRef<MediaStream | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [permissionState, setPermissionState] = useState<PermissionState>("granted")
    const [stream, setStream] = useState<MediaStream | null>(null)

    const startCamera = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: {facingMode: "environment", width: {ideal: 1280}, height: {ideal: 720}},
            })

            streamRef.current = mediaStream
            setStream(mediaStream)
            setPermissionState("granted")
        } catch (error) {
            console.error("Camera error:", error)
            if (error instanceof DOMException && error.name === "NotAllowedError") {
                setPermissionState("prompt")
            } else {
                setPermissionState("error")
            }
        }
    }, [])

    useEffect(() => {
        startCamera()

        return () => {
            if (streamRef.current) {
                console.log("Turning off camera hardware...")
                streamRef.current.getTracks().forEach(track => track.stop())
                streamRef.current = null
            }
        }
    }, [startCamera])

    // Hook to connect the video stream
    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play().catch(e => console.log("Video playback pending...", e))
        }
    }, [stream])

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current && streamRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext("2d")

            if (ctx) {
                ctx.drawImage(video, 0, 0)
                const imageData = canvas.toDataURL("image/jpeg", 0.9)

                // Turn off the stream immediately after taking the photo
                streamRef.current.getTracks().forEach(track => track.stop())
                streamRef.current = null

                onCapture(imageData)
            }
        }
    }

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const imageData = e.target?.result as string

                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop())
                    streamRef.current = null
                }

                onCapture(imageData)
            }
            reader.readAsDataURL(file)
        }
    }

    // Permission Request Screen
    if (permissionState === "prompt") {
        return (
            <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
                <header className="flex justify-between items-center p-6">
                    <GoBackButton onClickAction={onBack}/>
                    <LanguageSelector/>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center px-8">
                    <div className="w-24 h-24 rounded-[1.5rem] bg-[#FF5000]/10 flex items-center justify-center mb-8">
                        <Camera className="w-12 h-12 text-[#FF5000]"/>
                    </div>
                    <h2 className="text-2xl font-extrabold text-black text-center mb-4">
                        {t("camera.permission.title")}
                    </h2>
                    <p className="text-base text-black/60 font-medium text-center max-w-xs mb-10">
                        {t("camera.permission.description")}
                    </p>
                    <button
                        onClick={startCamera}
                        className="w-full max-w-xs py-5 px-8 bg-[#FF5000] text-white text-xl font-bold rounded-2xl border-2 border-[#FF5000] hover:bg-[#FF5000]/90 transition-all duration-200 active:scale-95"
                    >
                        {t("camera.permission.button")}
                    </button>
                </main>
            </div>
        )
    }

    // Permission Denied Screen
    if (permissionState === "denied" || permissionState === "error") {
        return (
            <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
                <header className="flex justify-between items-center p-6">
                    <GoBackButton onClickAction={onBack}/>
                    <LanguageSelector/>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center px-8">
                    <div className="w-24 h-24 rounded-[1.5rem] bg-red-100 flex items-center justify-center mb-8">
                        <AlertCircle className="w-12 h-12 text-red-500"/>
                    </div>
                    <h2 className="text-2xl font-extrabold text-black text-center mb-4">
                        {t("camera.permission.title")}
                    </h2>
                    <p className="text-base text-black/60 font-medium text-center max-w-xs mb-10">
                        {t("camera.permission.denied")}
                    </p>
                    <button
                        onClick={onBack}
                        className="w-full max-w-xs py-5 px-8 bg-black text-white text-xl font-bold rounded-2xl border-2 border-black hover:bg-[#FF5000] hover:border-[#FF5000] transition-all duration-200 active:scale-95"
                    >
                        {t("results.backHome")}
                    </button>
                </main>
            </div>
        )
    }

    // Camera Active Screen
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-10">
                <GoBackButton onClickAction={onBack} />
                <LanguageSelector/>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start px-2 py-24">
                <p className="text-white font-bold text-lg mb-6">{t("camera.title")}</p>

                {/* Circular Camera View */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                </div>

                <canvas ref={canvasRef} className="hidden"/>
            </main>

            {/* Capture Button */}
            <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-12 px-8">
                <div className="flex-1"/>

                <button
                    onClick={handleCapture}
                    className="w-20 h-20 rounded-full bg-[#FF5000] border-4 border-white flex items-center justify-center hover:bg-[#FF5000]/90 transition-all duration-200 active:scale-95 shadow-lg z-20"
                    aria-label={t("camera.capture")}
                >
                    <div className="w-14 h-14 rounded-full bg-white/20"/>
                </button>

                <div className="flex-1 flex justify-center">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border-2 border-black hover:bg-[#FF5000] hover:border-[#FF5000] hover:text-white transition-all duration-200"
                        title="Upload image"
                    >
                        <ImageIcon className="w-6 h-6"/>
                    </button>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                />
            </footer>
        </div>
    )
}
