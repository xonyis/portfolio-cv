"use client"
import { useRef, useState } from "react"
import OsNavbar from "@/components/xonyisOs/os-nav"
import { Desktop } from "@/components/xonyisOs/desktop"

export default function XonyisOs() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [openApp, setOpenApp] = useState<string | null>(null)

    const handleOpenApp = (appName: string) => {
        setOpenApp(appName)
        // Reset après un court délai pour permettre de rouvrir la même app
        setTimeout(() => setOpenApp(null), 100)
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-zinc-900  overflow-hidden">
            <OsNavbar onOpenApp={handleOpenApp} />
            {/* Desktop */}
            <Desktop openAppTrigger={openApp} />
        </div>
    )
}
