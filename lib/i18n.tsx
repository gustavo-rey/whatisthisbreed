"use client"

import {createContext, ReactNode, useContext, useEffect, useState} from "react"
import {breeds} from "./breeds"

export type Locale = "en" | "pt" | "es"

type Translations = {
    [key: string]: {
        en: string
        pt: string
        es: string
    }
}

export const translations: Translations = {
    // Common
    "common.selectLanguage": {
        en: "Select language",
        pt: "Selecionar idioma",
        es: "Seleccionar idioma",
    },
    // Home
    "home.title": {
        en: "WhatIsThisBreed?",
        pt: "WhatIsThisBreed?",
        es: "WhatIsThisBreed?",
    },
    "home.subtitle": {
        en: "Discover your dog's breed with AI",
        pt: "Descubra a raça do seu cão com IA",
        es: "Descubre la raza de tu perro con IA",
    },
    "home.discover": {
        en: "Discover",
        pt: "Descubra",
        es: "Descubrir",
    },
    // Camera
    "camera.title": {
        en: "Point at the dog",
        pt: "Aponte para o cão",
        es: "Apunta al perro",
    },
    "camera.permission.title": {
        en: "Camera Permission Required",
        pt: "Permissão de Câmera Necessária",
        es: "Permiso de Cámara Requerido",
    },
    "camera.permission.description": {
        en: "Please allow camera access to identify dog breeds",
        pt: "Por favor, permita o acesso à câmera para identificar raças de cães",
        es: "Por favor, permite el acceso a la cámara para identificar razas de perros",
    },
    "camera.permission.button": {
        en: "Allow Camera",
        pt: "Permitir Câmera",
        es: "Permitir Cámara",
    },
    "camera.permission.denied": {
        en: "Camera access was denied. Please enable it in your browser settings.",
        pt: "Acesso à câmera foi negado. Por favor, habilite nas configurações do navegador.",
        es: "El acceso a la cámara fue denegado. Por favor, habilítalo en la configuración del navegador.",
    },
    "camera.capture": {
        en: "Capture",
        pt: "Capturar",
        es: "Capturar",
    },
    // Capture
    "capture.takeAnother": {
        en: "Take Another",
        pt: "Tirar Outra",
        es: "Tomar Otra",
    },
    "capture.discover": {
        en: "Discover",
        pt: "Descobrir",
        es: "Descubrir",
    },
    // Results
    "results.title": {
        en: "Results",
        pt: "Resultados",
        es: "Resultados",
    },
    "results.topBreeds": {
        en: "Top Breeds Identified",
        pt: "Principais Raças Identificadas",
        es: "Principales Razas Identificadas",
    },
    "results.tryAgain": {
        en: "Try Again",
        pt: "Tentar Novamente",
        es: "Intentar de Nuevo",
    },
    "results.backHome": {
        en: "Back to Home",
        pt: "Voltar ao Início",
        es: "Volver al Inicio",
    },
    // Fallback
    "fallback.title": {
        en: "Oops!",
        pt: "Ops!",
        es: "¡Ups!",
    },
    "fallback.message": {
        en: "We couldn't identify a dog breed in this image. Make sure the dog is clearly visible and try again!",
        pt: "Não conseguimos identificar uma raça de cão nesta imagem. Certifique-se de que o cão está claramente visível e tente novamente!",
        es: "No pudimos identificar una raza de perro en esta imagen. ¡Asegúrate de que el perro sea claramente visible e intenta de nuevo!",
    },
    // Loading
    "loading.analyzing": {
        en: "Analyzing...",
        pt: "Analisando...",
        es: "Analizando...",
    },
    // 404
    "notFound.title": {
        en: "Page not found",
        pt: "Página não encontrada",
        es: "Página no encontrada",
    },
    "notFound.description": {
        en: "The page you are looking for does not exist or may have been moved.",
        pt: "A página que você está procurando não existe ou pode ter sido movida.",
        es: "La página que buscas no existe o puede haber sido movida.",
    },
    ...Object.fromEntries(
        Object.entries(breeds).map(([id, langs]) => [`breed.${id}`, langs])
    )
}

type I18nContextType = {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function detectBrowserLanguage(): Locale {
    if (typeof window === "undefined") return "en"

    const browserLang = navigator.language.split("-")[0].toLowerCase()

    if (browserLang === "pt") return "pt"
    if (browserLang === "es") return "es"

    return "en"
}

export function I18nProvider({children}: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const savedLocale = localStorage.getItem("locale") as Locale | null
        if (savedLocale && ["en", "pt", "es"].includes(savedLocale)) {
            setLocale(savedLocale)
        } else {
            setLocale(detectBrowserLanguage())
        }
        setMounted(true)
    }, [])

    const handleSetLocale = (newLocale: Locale) => {
        setLocale(newLocale)
        localStorage.setItem("locale", newLocale)
    }

    const t = (key: string): string => {
        const translation = translations[key]
        if (!translation) return key
        return translation[locale] || translation.en || key
    }

    if (!mounted) {
        return null
    }

    return (
        <I18nContext.Provider value={{locale, setLocale: handleSetLocale, t}}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error("useI18n must be used within an I18nProvider")
    }
    return context
}
