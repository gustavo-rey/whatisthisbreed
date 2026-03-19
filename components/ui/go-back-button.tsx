"use client"

import {ArrowLeft} from "lucide-react"

type GoBackButtonProps = {
    onClickAction: () => void
    ariaLabel?: string
    variant?: "default" | "overlay"
    className?: string
}

export function GoBackButton({
    onClickAction,
    ariaLabel = "Go back",
}: Readonly<GoBackButtonProps>) {
    return (
        <button
            onClick={onClickAction}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border-2 border-black hover:bg-[#FF5000] hover:border-[#FF5000] hover:text-white transition-all duration-200"
            aria-label={ariaLabel}
        >
            <ArrowLeft className="w-5 h-5"/>
        </button>
    )
}


