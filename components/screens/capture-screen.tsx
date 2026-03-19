"use client"

import {useI18n} from "@/lib/i18n"
import {LanguageSelector} from "@/components/ui/language-selector"
import {GoBackButton} from "@/components/ui/go-back-button"

type CaptureScreenProps = {
    imageData: string
    onRetake: () => void
    onDiscover: () => void
    onBack: () => void
}

export function CaptureScreen({imageData, onRetake, onDiscover, onBack}: CaptureScreenProps) {
    const {t} = useI18n()

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-10">
                <GoBackButton onClickAction={onBack} />
                <LanguageSelector/>
            </header>

            <main className="flex-1 flex flex-col items-center justify-start px-2 py-24 mt-52">
                {/* Circular Photo Preview */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img
                        src={imageData}
                        alt="Captured"
                        className="w-full h-full object-cover"
                    />
                </div>
            </main>

            {/* Action Buttons */}
            <footer className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 px-8 pb-12">
                <button
                    onClick={onDiscover}
                    className="w-full py-5 px-8 bg-[#FF5000] text-white text-xl font-bold rounded-2xl border-2 border-[#FF5000] hover:bg-[#FF5000]/90 transition-all duration-200 active:scale-95"
                >
                    {t("capture.discover")}
                </button>
                <button
                    onClick={onRetake}
                    className="w-full py-5 px-8 bg-white text-black text-xl font-bold rounded-2xl border-2 border-white hover:bg-white/90 transition-all duration-200 active:scale-95"
                >
                    {t("capture.takeAnother")}
                </button>
            </footer>
        </div>
    )
}
