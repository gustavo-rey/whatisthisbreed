"use client"

import {Globe} from "lucide-react"
import {Locale, useI18n} from "@/lib/i18n"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"

const languages: { code: Locale; label: string; flag: string }[] = [
    {code: "en", label: "English", flag: "🇺🇸"},
    {code: "pt", label: "Português", flag: "🇧🇷"},
    {code: "es", label: "Español", flag: "🇪🇸"},
]

export function LanguageSelector() {
    const {locale, setLocale, t} = useI18n()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border-2 border-black hover:bg-[#FF5000] hover:border-[#FF5000] hover:text-white transition-all duration-200"
                    aria-label={t("common.selectLanguage")}
                >
                    <Globe className="w-5 h-5"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-2 border-black bg-white">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLocale(lang.code)}
                        className={`cursor-pointer rounded-xl px-4 py-3 text-base font-semibold ${
                            locale === lang.code ? "bg-[#FF5000]/10 text-[#FF5000]" : ""
                        }`}
                    >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
