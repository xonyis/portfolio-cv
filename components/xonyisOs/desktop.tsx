"use client"

import * as React from "react"
import { MacWindow } from "@/components/xonyisOs/window"
import { Folder, FileText, Palette, LogOut  } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import Calculator from "@/components/xonyisOs/calculator"
import Paint from "@/components/xonyisOs/paint"
import SnakeGamePage from "@/components/xonyisOs/snake";
import Chatiooo from "@/components/xonyisOs/Chattioo";

interface WindowData {
    id: string
    title: string
    content: React.ReactNode
    position: { x: number; y: number }
    width?: number
    height?: number
    resizable?: boolean
    scrollable?: boolean
    minWidth?: number
    minHeight?: number
}

interface DesktopProps {
    openAppTrigger?: string | null
}

export function Desktop({ openAppTrigger }: DesktopProps) {
    // État vide au démarrage - plus de fenêtres par défaut
    const [windows, setWindows] = React.useState<WindowData[]>([])
    const [activeWindow, setActiveWindow] = React.useState<string>("")
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
            hour12: false,
        })
    }

    // Applications disponibles
    const availableApps = {
        paint: {
            title: "Paint",
            width: 400,
            minWidth: 400,
            height: 400,
            minHeight: 400,
            resizable: true,
            scrollable: true,
            content: (
                <Paint/>
            ),
        },
        finder: {
            title: "Finder",
            width: 450,
            height: 350,
            resizable: true,
            scrollable: false,
            content: (
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <Folder className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Applications</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <Folder className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Documents</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <Folder className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Bureau</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">README.txt</span>
                    </div>
                </div>
            ),
        },
        textedit: {
            title: "TextEdit",
            width: 400,
            height: 300,
            resizable: true,
            scrollable: false,
            content: (
                <div className="h-full">
          <textarea
              className="w-full h-full border-none outline-none resize-none text-sm p-2"
              placeholder="Tapez votre texte ici..."
              defaultValue="Bienvenue dans TextEdit !"
          />
                </div>
            ),
        },
        calculator: {
            title: "Calculator",
            width: 300,
            minWidth: 300,
            height: 492,
            minHeight: 492,
            resizable: false,
            scrollable: false,
            content: (
                <Calculator/>
            ),
        },
        snake: {
            title: "Snake",
            width: 325,
            minWidth: 325,
            height: 470,
            minHeight: 470,
            resizable: false,
            scrollable: false,
            content: (
                <SnakeGamePage/>
            ),
        },
        chatioo: {
            title: "Chatioo",
            width: 475,
            minWidth: 475,
            height: 470,
            minHeight: 350,
            resizable: true,
            scrollable: true,
            content: (
                <Chatiooo/>
            ),
        },
        infos: {
            title: "Infos",
            width: 500,
            height: 400,
            resizable: true,
            scrollable: true,
            content: (
                <div className="h-full flex flex-col ">
                    <span className="text-lg font-medium text-black font-pixelify text-center mb-3">
                        {formatTime(time)}
                    </span>
                    <div className=" flex justify-center ">
                        <div>
                            <Image
                                src="/memojii-sticker.png"
                                alt=""
                                width={100} // ajuste à la taille que tu veux
                                height={100}
                                className="rounded-full object-contain ml-4"
                            />
                            <p className="text-black underline text-center text-sm/3">Xonyis Os<br/>
                                <span className="text-neutral-400 text-xs underline text-center">V1.0.0</span><br/>
                            </p>

                        </div>
                    </div>
                    {/* Informations de profil */}
                    <div className="flex-1 mx-auto px-4 space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs">@</span>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">Email</p>
                                <p className="text-sm text-black">juliamayerpro@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                                <span className="text-white text-xs">G</span>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">GitHub</p>
                                <p className="text-sm text-black">github.com/xonyis</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs">in</span>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">LinkedIn</p>
                                <p className="text-sm text-black">linkedin.com/in/julian-mayer</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 mx-auto px-4 space-y-4 mt-3">
                    <div>
                        <p className="text-xs text-neutral-500 mb-1">Technologies utilisées pour XonyisOs:</p>
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap justify-center gap-2">
                            <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs font-mono">Next.js</span>
                            <span className="bg-sky-200 text-sky-800 px-2 py-1 rounded text-xs font-mono">TailwindCSS</span>
                          </div>
                          <div className="flex flex-wrap justify-center gap-2">
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">Socket.io</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-mono">shadcn/ui</span>
                          </div>
                        </div>
                    </div>

                        
                    </div>

                    {/* Bouton de déconnexion */}
                    <div className="p-2 flex text-center mt-3 w-48 mx-auto">
                        <Link href="/"
                            
                            className="mx-auto text-red-500 hover:text-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                            <Image
                                src="/Power_Red.png"
                                alt=""
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="mx-auto text-red-500 hover:text-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                        >
                            <Image
                                src="/Wrench_Orange.png"
                                alt=""
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </button>
                    </div>
                </div>
            ),
        }
    }

    // Écouter le trigger d'ouverture d'app
    React.useEffect(() => {
        if (openAppTrigger && availableApps[openAppTrigger as keyof typeof availableApps]) {
            openWindow(openAppTrigger)
        }
    }, [openAppTrigger])

    const closeWindow = (id: string) => {
        setWindows(windows.filter((w) => w.id !== id))
    }

    const focusWindow = (id: string) => {
        setActiveWindow(id)
    }

    const openWindow = (type: string) => {
        const app = availableApps[type as keyof typeof availableApps]
        if (!app) return

        // Vérifier si l'app est déjà ouverte
        const existingWindow = windows.find((w) => w.id.startsWith(type))
        if (existingWindow) {
            focusWindow(existingWindow.id)
            return
        }

        const newWindow: WindowData = {
            id: `${type}-${Date.now()}`,
            title: app.title,
            position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 100 },
            width: app.width,
            height: app.height,
            content: app.content,
            resizable: app.resizable !== false,
            scrollable: app.scrollable === true, // Par défaut false sauf si explicitement true
            minWidth: app.minWidth,
            minHeight: app.minHeight,
        }

        setWindows([...windows, newWindow])
        setActiveWindow(newWindow.id)
    }

    // Désactiver le scroll sur le desktop
    React.useEffect(() => {
        const preventDefault = (e: WheelEvent) => {
            e.preventDefault()
        }

        const desktopElement = document.getElementById("desktop")
        if (desktopElement) {
            desktopElement.addEventListener("wheel", preventDefault, { passive: false })
        }

        // Désactiver aussi le scroll global
        document.body.style.overflow = "hidden"

        return () => {
            if (desktopElement) {
                desktopElement.removeEventListener("wheel", preventDefault)
            }
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        <div
            id="desktop"
            className="relative w-full h-screen overflow-hidden"
            style={{
                height: "calc(100vh - 28px)",
            }}
        >
            {/* Desktop Icons */}
            <div
                className="absolute top-0 left-4 grid gap-x-6 gap-y-2 my-1 font-pixelify"
                style={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gridTemplateRows: "repeat(auto-fit, minmax(90px, 80px))", // Hauteur min 80px, s'adapte
                    gridAutoRows: "minmax(80px, 1fr)", // Hauteur min 80px
                    height: "calc(100vh - 40px)",
                    maxHeight: "calc(100vh - 100px)",
                    overflowY: "auto",
                    overflowX: "auto"
                }}
            >
                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded "
                    onDoubleClick={() => openWindow("infos")}
                >
                    <Image
                        src="/Chip_Icon.png"
                        alt=""
                        width={48} // ajuste à la taille que tu veux
                        height={48}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white w-full">Infos Système</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded"
                    onDoubleClick={() => openWindow("finder")}
                >
                    <Image
                        src="/finder.png"
                        alt=""
                        width={48} // ajuste à la taille que tu veux
                        height={48}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white">Finder</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded"
                    onDoubleClick={() => openWindow("paint")}
                >
                    <Image
                        src="/paintIcon.png"
                        alt=""
                        width={55} // ajuste à la taille que tu veux
                        height={55}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white">Paint</span>
                </div>

                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded"
                    onDoubleClick={() => openWindow("textedit")}
                >
                    <Image
                        src="/textEditIcon.png"
                        alt=""
                        width={48} // ajuste à la taille que tu veux
                        height={48}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white">Text Edit</span>
                </div>

                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded"
                    onDoubleClick={() => openWindow("calculator")}
                >
                    <Image
                        src="/CalculatorIcon.png"
                        alt=""
                        width={48} // ajuste à la taille que tu veux
                        height={48}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white">Calculator</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded"
                    onDoubleClick={() => openWindow("snake")}
                >
                    <Image
                        src="/snake.png"
                        alt=""
                        width={48} // ajuste à la taille que tu veux
                        height={48}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white">Snake</span>
                </div>
                <div
                    className="flex flex-col justify-center items-center cursor-pointer hover:bg-white/20 p-2 rounded"
                    onDoubleClick={() => openWindow("chatioo")}
                >
                    <Image
                        src="/Chat_Icon.png"
                        alt=""
                        width={55} // ajuste à la taille que tu veux
                        height={55}
                        className=" object-contain"
                    />
                    <span className="text-xs text-white">Chatioo</span>
                </div>
            </div>

            {/* Windows */}
            {windows.map((window) => (
                <MacWindow
                    key={window.id}
                    title={window.title}
                    initialPosition={window.position}
                    onClose={() => closeWindow(window.id)}
                    isActive={activeWindow === window.id}
                    onFocus={() => focusWindow(window.id)}
                    width={window.width}
                    height={window.height}
                    resizable={window.resizable}
                    scrollable={window.scrollable}
                    minWidth={window.minWidth}
                    minHeight={window.minHeight}
                >
                    {window.content}
                </MacWindow>
            ))}
        </div>
    )
}
