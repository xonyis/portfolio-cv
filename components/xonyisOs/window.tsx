"use client"

import * as React from "react"
import { X, Minus, Square } from "lucide-react"
import {useEffect, useState} from "react";


interface MacWindowProps {
    title: string
    children: React.ReactNode
    initialPosition?: { x: number; y: number }
    onClose?: () => void
    isActive?: boolean
    onFocus?: () => void
    width?: number
    height?: number
    resizable?: boolean
    scrollable?: boolean
    minWidth?: number
    minHeight?: number
}

type ResizeDirection =
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | null

export function MacWindow({
                              title,
                              children,
                              initialPosition = { x: 100, y: 100 },
                              onClose,
                              isActive = false,
                              onFocus,
                              width = 400,
                              height = 300,
                              minWidth = 200,
                              minHeight = 150,
                              resizable = true,
                              scrollable = false,
                          }: MacWindowProps) {
    const [position, setPosition] = React.useState(initialPosition)
    const [isDragging, setIsDragging] = React.useState(false)
    const [size, setSize] = React.useState({ width, height })
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })
    const [resizeStart, setResizeStart] = React.useState({ x: 0, y: 0, width: 0, height: 0 })
    const windowRef = React.useRef<HTMLDivElement>(null)
    const [time, setTime] = useState(new Date())
    const [isResizing, setIsResizing] = React.useState<ResizeDirection>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)


    // Directions de redimensionnement autorisées
    const allowedResizeDirections: ResizeDirection[] = [
        "right",
        "bottom",
        "bottomRight",
        // "top", "left", "topLeft", "topRight", "bottomLeft" sont désactivés
    ]
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
    const handleMouseDown = (e: React.MouseEvent) => {
        if (onFocus) onFocus()

        // Calculer le décalage par rapport à la position actuelle de la fenêtre
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        })
        setIsDragging(true)
    }

    const handleResizeStart = (e: React.MouseEvent, direction: ResizeDirection) => {
        // Vérifier si la direction est autorisée
        if (!allowedResizeDirections.includes(direction)) return

        e.preventDefault()
        e.stopPropagation()

        if (onFocus) onFocus()

        setIsResizing(direction)
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            width: size.width,
            height: size.height,
        })
    }


    // Gestionnaire de scroll pour les fenêtres scrollables
    const handleWheel = React.useCallback(
        (e: WheelEvent) => {
            if (scrollable && contentRef.current) {
                // Permettre le scroll uniquement si la fenêtre est active et scrollable
                if (isActive) {
                    e.stopPropagation()
                    // Le scroll natif du navigateur s'occupera du reste
                }
            }
        },
        [scrollable, isActive],
    )

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Gestion du déplacement
            if (isDragging) {
                // Nouvelle position = position de la souris - décalage initial
                const newX = e.clientX - dragOffset.x
                const newY = e.clientY - dragOffset.y

                // Limiter les fenêtres aux bords de l'écran
                const maxX = window.innerWidth - size.width
                const maxY = window.innerHeight - size.height

                setPosition({
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(1, Math.min(newY, maxY)), // 28px pour la barre de menu
                })
            }

            // Gestion du redimensionnement
            if (isResizing && resizable) {
                const deltaX = e.clientX - resizeStart.x
                const deltaY = e.clientY - resizeStart.y

                let newWidth = resizeStart.width
                let newHeight = resizeStart.height
                const newX = position.x
                const newY = position.y

                // Calcul des nouvelles dimensions selon la direction
                switch (isResizing) {
                    case "right":
                        newWidth = Math.max(minWidth, resizeStart.width + deltaX)
                        break
                    case "bottom":
                        newHeight = Math.max(minHeight, resizeStart.height + deltaY)
                        break
                    case "bottomRight":
                        newWidth = Math.max(minWidth, resizeStart.width + deltaX)
                        newHeight = Math.max(minHeight, resizeStart.height + deltaY)
                        break
                    // Les autres cas sont désactivés
                }

                // Mise à jour des dimensions et position
                setSize({ width: newWidth, height: newHeight })
                setPosition({ x: newX, y: newY })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            setIsResizing(null)
        }

        if (isDragging || isResizing) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging, isResizing, dragOffset, position, size, resizeStart, resizable])

    // Ajouter l'event listener pour le scroll
    React.useEffect(() => {
        const windowElement = windowRef.current
        if (windowElement && scrollable) {
            windowElement.addEventListener("wheel", handleWheel, { passive: false })
            return () => {
                windowElement.removeEventListener("wheel", handleWheel)
            }
        }
    }, [handleWheel, scrollable])

    // Fonction pour obtenir le style du curseur selon la position
    const getResizeCursor = (direction: ResizeDirection): string => {
        if (!allowedResizeDirections.includes(direction)) return "default"

        switch (direction) {
            case "bottom":
                return "ns-resize"
            case "right":
                return "ew-resize"
            case "bottomRight":
                return "nwse-resize"
            default:
                return "default"
        }
    }

    return (
        <div
            ref={windowRef}
            // className={`absolute bg-red-300 border-2 border-gray-400 shadow-lg select-none font-pixelify ${isActive ? "z-50" : "z-40"}`}
            className={`bg-gray-300 absolute border-2 border-gray-800 select-none w-full font-pixelify${isActive ? "z-50" : "z-40"}`}
            
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                cursor: isDragging ? "grabbing" : "default",
                borderTopColor: "#ffffff",
                borderLeftColor: "#ffffff",
                borderRightColor: "#808080",
                borderBottomColor: "#808080",
            }}
            onClick={onFocus}
        >
            {/* Title Bar */}
            <div
                className={`border-b-2 flex items-center justify-between h-6 px-1 border-b border-gray-300 h-[27px]  ${
                    isActive ? "bg-gradient-to-b from-gray-200 to-gray-300" : "bg-gradient-to-b from-gray-200 to-gray-300"
                }`}
                
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? "grabbing" : "grab",
                    borderBottomColor: "#808080",
                 }}
            >

                {/* Points horizontaux en arrière-plan - évitent le titre et les icônes */}
          <div className="absolute inset-0 pointer-events-none ">
            {/* Lignes de points dynamiques */}
            {/* Calcule dynamiquement le nombre de points par ligne */}
            {/* On soustrait le padding horizontal (px-2 = 16px) de la largeur totale */}
            {/* On divise ensuite la largeur utilisable par une valeur approximative de l'espace par point */}
            {/* Assure un minimum de 10 points */}
            {/* Utilise une valeur de 8px par point (environ taille point + gap) */}
            

            {/* Première ligne de points */}
            <div className=" inset-0 absolute top-[3px] left-0 right-0 grid gap-1 px-2"
              style={{ gridTemplateColumns: `repeat(${Math.max(10, Math.floor((size.width - 16) / 6))}, 1fr)` }}
            >
              {[...Array(Math.max(10, Math.floor((size.width - 16) / 6)))].map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-black  rounded-full"></div>
              ))}
            </div>

            {/* Deuxième ligne de points */}
            <div className="inset-0 absolute top-[10px] left-0 right-0 grid gap-1 px-2"
              style={{ gridTemplateColumns: `repeat(${Math.max(10, Math.floor((size.width - 16) / 6))}, 1fr)` }}
            >
              {[...Array(Math.max(10, Math.floor((size.width - 16) / 6)))].map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-black  rounded-full"></div>
              ))}
            </div>

            {/* Troisième ligne de points */}
            <div className="inset-0 absolute top-[17px] left-0 right-0 grid gap-1 px-2"
              style={{ gridTemplateColumns: `repeat(${Math.max(10, Math.floor((size.width - 16) / 6))}, 1fr)` }}
            >
              {[...Array(Math.max(10, Math.floor((size.width - 16) / 6)))].map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-black rounded-full"></div>
              ))}
            </div>
          </div>

                {/* Window Controls */}
                <div className="flex h-full bg-gradient-to-b from-gray-200 to-gray-300 relative items-center space-x-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            if (onClose) onClose()
                        }}
                        style={{
                            borderTopColor: "#ffffff",
                            borderLeftColor: "#ffffff",
                            borderRightColor: "#808080",
                            borderBottomColor: "#808080",
                          }}
                        className="w-5 h-5 mr-1 mb-[1px] border border-gray-400 hover:bg-gray-300 active:bg-gray-400 flex items-center justify-center  "
                    >
                        <X className="w-5 h-5 text-red-600 " />
                    </button>

                </div>

                {/* Title */}
                <div className={`bg-gradient-to-b from-gray-200 to-gray-300 relative h-full px-7 space-x-1 text-s font-medium text-gray-700`}>{title}</div>

                {/* Empty space for balance */}
                <div className="w-12"></div>
            </div>

            {/* Window Content */}
            <div className="p-2 pt-2">
            <div
                ref={contentRef}
                className={` bg-white ${scrollable ? "overflow-auto" : "overflow-hidden"} border-2 border-gray-400`}
                style={{height: size.height - 47,
                    borderTopColor: "#808080",
            borderLeftColor: "#808080",
            borderRightColor: "#ffffff",
            borderBottomColor: "#ffffff",
                }
            }
            >
                {children}
                
            </div>
            
            </div>
            {/* Resize Handles - only shown if resizable */}
            {resizable && (
                <>
                    {/* Seuls les bords droit et bas, et le coin bas-droit sont actifs */}
                    <div
                        className="absolute w-3 h-3 bottom-0 right-0 cursor-nwse-resize"
                        onMouseDown={(e) => handleResizeStart(e, "bottomRight")}
                    />
                    <div
                        className="absolute w-3 top-3 bottom-3 right-0 cursor-ew-resize"
                        onMouseDown={(e) => handleResizeStart(e, "right")}
                    />
                    <div
                        className="absolute h-3 left-3 right-3 bottom-0 cursor-ns-resize"
                        onMouseDown={(e) => handleResizeStart(e, "bottom")}
                    />
                </>
            )}
        </div>
    )
}
