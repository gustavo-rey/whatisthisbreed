"use client"

import {Home, RefreshCw} from "lucide-react"
import {useI18n} from "@/lib/i18n"
import {LanguageSelector} from "@/components/ui/language-selector"
import logoIcon from "@/assets/logo-icon.png";
import Image from "next/image";
import {GoBackButton} from "@/components/ui/go-back-button"

export type BreedResult = {
    breed: string
    probability: number
}

type ResultsScreenProps = {
    imageData: string
    results: BreedResult[]
    onTryAgain: () => void
    onBackHome: () => void
}

export function ResultsScreen({imageData, results, onTryAgain, onBackHome}: ResultsScreenProps) {
    const {t} = useI18n()

    // Filter results with probability > 0 and take top 4
    const topResults = results
        .filter((r) => r.probability > 0)
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 4)

    const hasResults = topResults.length > 0

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
            <header className="flex justify-between items-center p-6">
                <GoBackButton onClickAction={onBackHome}/>
                <LanguageSelector/>
            </header>

            <main className="flex-1 flex flex-col px-6 pb-6">
                {/* Photo Preview */}
                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-black shadow-lg">
                        <img
                            src={imageData}
                            alt="Analyzed"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {hasResults ? (
                    <>
                        <h2 className="text-2xl font-extrabold text-black text-center mb-8">
                            {t("results.topBreeds")}
                        </h2>

                        {/* Results List */}
                        <div className="flex flex-col gap-5">
                            {topResults.map((result, index) => (
                                <div key={index} className="bg-white rounded-2xl p-5 border-2 border-black/10">
                                    <div className="flex justify-between items-center mb-3">
                                        {/* Use t() to translate the breed key */}
                                        <span className="text-lg font-bold text-black">{t(result.breed)}</span>
                                        <span
                                            className="text-lg font-extrabold text-[#FF5000]">{Math.round(result.probability)}%</span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#FF5000] rounded-full transition-all duration-500 ease-out"
                                            style={{width: `${result.probability}%`}}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Fallback - No Results */
                    <div className="flex flex-col items-center text-center flex-1 justify-center">
                        <div className="w-40 h-40 rounded-full bg-[#FF5000]/10 flex items-center justify-center mb-6">
                            <Image src={logoIcon} alt="Logo" className="w-32 h-32 object-contain"/>
                        </div>
                        <h2 className="text-2xl font-extrabold text-black mb-4">
                            {t("fallback.title")}
                        </h2>
                        <p className="text-base text-black/60 font-medium max-w-xs">
                            {t("fallback.message")}
                        </p>
                    </div>
                )}
            </main>

            {/* Action Buttons */}
            <footer className="flex flex-col gap-4 px-6 pb-8">
                <button
                    onClick={onTryAgain}
                    className="w-full py-5 px-8 bg-[#FF5000] text-white text-xl font-bold rounded-2xl border-2 border-[#FF5000] hover:bg-[#FF5000]/90 transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
                >
                    <RefreshCw className="w-6 h-6"/>
                    {t("results.tryAgain")}
                </button>
                <button
                    onClick={onBackHome}
                    className="w-full py-5 px-8 bg-white text-black text-xl font-bold rounded-2xl border-2 border-black hover:bg-black hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
                >
                    <Home className="w-6 h-6"/>
                    {t("results.backHome")}
                </button>
            </footer>
        </div>
    )
}
