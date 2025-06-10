"use client"
import { useRef, useState, useEffect } from "react"
import OsNavbar from "@/components/xonyisOs/os-nav"
import { Desktop } from "@/components/xonyisOs/desktop"

export default function XonyisOs() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [openApp, setOpenApp] = useState<string | null>(null)
    const [isDesktop, setIsDesktop] = useState(true)

    useEffect(() => {
        // Détection simple de la largeur d'écran (peut être améliorée avec user-agent)
        const checkScreen = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }
        checkScreen()
        window.addEventListener("resize", checkScreen)
        return () => window.removeEventListener("resize", checkScreen)
    }, [])

    const handleOpenApp = (appName: string) => {
        setOpenApp(appName)
        // Reset après un court délai pour permettre de rouvrir la même app
        setTimeout(() => setOpenApp(null), 100)
    }

    if (!isDesktop) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white text-center p-8">
                <h1 className="text-3xl font-bold mb-4">XonyisOs n'est accessible que sur ordinateur</h1>
                <p className="text-lg">Pour profiter de l'expérience complète, connecte-toi depuis un PC ou un écran plus large.</p>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-zinc-900 overflow-hidden">
            <OsNavbar onOpenApp={handleOpenApp} />
            {/* Desktop */}
            <Desktop openAppTrigger={openApp} />
        </div>
    )
}
