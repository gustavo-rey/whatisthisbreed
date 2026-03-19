"use client"

import Image from "next/image"
import {useI18n} from "@/lib/i18n"
import {LanguageSelector} from "@/components/ui/language-selector"
import logo from "@/assets/logo.png"

type HomeScreenProps = {
    onStart: () => void
}

export function HomeScreen({onStart}: HomeScreenProps) {
    const {t} = useI18n()

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
            {/* Header */}
            <header className="flex justify-end p-6">
                <LanguageSelector/>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
                {/* Logo */}
                <div className="flex flex-col items-center gap-6 mb-16">
                    <Image src={logo} alt={t("home.title")} className="w-100 h-60 object-contain" priority/>
                    <p className="text-xl text-black/60 font-medium text-center max-w-xs">
                        {t("home.subtitle")}
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    onClick={onStart}
                    className="w-full max-w-xs py-5 px-8 bg-[#FF5000] text-white text-2xl font-bold rounded-2xl border-2 border-[#FF5000] hover:bg-black hover:border-black transition-all duration-200 active:scale-95"
                >
                    {t("home.discover")}
                </button>
            </main>
        </div>
    )
}
