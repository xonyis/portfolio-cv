"use client"

import * as React from "react"
import { Apple, Palette, Edit, Calculator } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import {useEffect, useState} from "react";

interface OsNavbarProps {
    onOpenApp?: (appName: string) => void
}

const menuItems = [
    {
        title: "Fichier",
        items: [
            "Nouveau",
            "Ouvrir...",
            "Fermer",
            "-",
            "Enregistrer",
            "Enregistrer sous...",
            "-",
            "Imprimer...",
            "-",
            "Quitter",
        ],
    },
    {
        title: "Applications",
        items: [
            { label: "Paint", action: "paint", icon: <Palette className="w-4 h-4 mr-2" /> },
            { label: "TextEdit", action: "textedit", icon: <Edit className="w-4 h-4 mr-2" /> },
            { label: "Calculatrice", action: "calculator", icon: <Calculator className="w-4 h-4 mr-2" /> },
            { label: "Snake", action: "snake", icon: <Calculator className="w-4 h-4 mr-2" /> },

            "-",
            { label: "Finder", action: "finder", icon: <Apple className="w-4 h-4 mr-2" /> },
        ],
    },
    {
        title: "Édition",
        items: ["Annuler", "Rétablir", "-", "Couper", "Copier", "Coller", "Effacer", "-", "Tout sélectionner"],
    },
    {
        title: "Affichage",
        items: ["Icônes", "Liste", "-", "Trier par nom", "Trier par date", "Trier par taille"],
    },
    {
        title: "Spécial",
        items: ["Vider la corbeille", "Redémarrer", "Éteindre"],
    },
]

export default function OsNavbar({ onOpenApp }: OsNavbarProps) {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null)


    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        })
    }
    const handleMenuClick = (item: any) => {
        if (typeof item === "object" && item.action && onOpenApp) {
            onOpenApp(item.action)
        }
    }
    const handleLogoClick = () => {
        if (onOpenApp) {
            onOpenApp("infos") // Ouvre le Finder au double-clic sur le logo
        }
    }

    return (
        <div className="w-full bg-white overflow-hidden border-b border-gray-300 shadow-sm text-md font-pixelify">
            {/* Menu Bar */}
            <div className="flex items-center h-7 px-2 py-3 bg-gradient-to-b from-gray-100 to-gray-200 border-b border-gray-400">
                {/* Apple Logo */}
                <div className="flex items-center mr-4">
                    <button
                        className="px-3 py-1 text-md font-medium text-black outline-none transition-colors duration-150 font-pixelify"
                        onClick={handleLogoClick}
                    >
                        <Image
                            src="/memojii-sticker.png"
                            alt=""
                            width={30} // ajuste à la taille que tu veux
                            height={30}
                            className="rounded-full object-contain"
                        />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex items-center space-x-0">
                    {menuItems.map((menu) => (
                        <DropdownMenu key={menu.title}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="px-3 py-1 text-md font-medium text-black outline-none transition-colors duration-150 font-pixelify"
                                    onMouseEnter={() => setActiveMenu(menu.title)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    {menu.title}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="min-w-[160px] bg-white border border-gray-400 shadow-lg rounded-none p-0"
                                align="start"
                            >
                                {menu.items.map((item, index) =>
                                    item === "-" ? (
                                        <DropdownMenuSeparator key={index} className="bg-gray-300 h-px my-0" />
                                    ) : (
                                        <DropdownMenuItem
                                            key={typeof item === "string" ? item : item.label}
                                            className="px-3 py-1 text-md text-black cursor-pointer rounded-none font-pixelify flex items-center"
                                            onClick={() => handleMenuClick(item)}
                                        >
                                            {typeof item === "object" && item.icon}
                                            <span>{typeof item === "string" ? item : item.label}</span>
                                        </DropdownMenuItem>
                                    ),
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ))}
                </div>

                {/* Right side - Clock */}
                <div className="ml-auto">
          <span className="text-lg font-medium text-black font-pixelify">
            {formatTime(time)}
          </span>
                </div>
            </div>
        </div>
    )
}
