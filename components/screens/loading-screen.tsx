"use client"

import Image from "next/image"
import {useI18n} from "@/lib/i18n"
import logoIcon from "@/assets/logo-icon.png"

export function LoadingScreen() {
    const {t} = useI18n()

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8">
                {/* Animated Loader */}
                <div className="relative w-50 h-50">
                    <div className="absolute inset-0 rounded-full border-4 border-black/10"/>
                    <div
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FF5000] animate-spin"/>
                    <div className="absolute inset-3 rounded-full bg-[#FF5000]/10 flex items-center justify-center">
                        <Image src={logoIcon} alt="Logo" className="w-40 h-40 object-contain"/>
                    </div>
                </div>
                <p className="text-xl font-bold text-black">{t("loading.analyzing")}</p>
            </div>
        </div>
    )
}
