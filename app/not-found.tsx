"use client"

import Image from "next/image"
import Link from "next/link"
import logoIcon from "@/assets/logo-icon.png"
import {useI18n} from "@/lib/i18n"
import {LanguageSelector} from "@/components/ui/language-selector"

export default function NotFound() {
  const {t} = useI18n()

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <header className="flex justify-end p-6">
        <LanguageSelector/>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md flex flex-col items-center text-center">
          <div className="w-40 h-40 rounded-full bg-[#FF5000]/10 flex items-center justify-center mb-8 shadow-sm">
            <Image
              src={logoIcon}
              alt="WhatIsThisBreed logo"
              className="w-28 h-28 object-contain"
              priority
            />
          </div>

          <span className="text-[#FF5000] text-lg font-bold tracking-wide mb-2">404</span>
          <h1 className="text-4xl font-extrabold text-black mb-4">{t("notFound.title")}</h1>
          <p className="text-base text-black/60 font-medium mb-10 max-w-sm">
            {t("notFound.description")}
          </p>

          <Link
            href="/"
            className="w-full max-w-xs py-5 px-8 bg-[#FF5000] text-white text-xl font-bold rounded-2xl border-2 border-[#FF5000] hover:bg-black hover:border-black transition-all duration-200 active:scale-95"
          >
            {t("results.backHome")}
          </Link>
        </div>
      </main>
    </div>
  )
}

