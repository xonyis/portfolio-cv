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


    // Constantes pour les tailles minimales
    const MIN_WIDTH = 200
    const MIN_HEIGHT = 150
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
                        newWidth = Math.max(MIN_WIDTH, resizeStart.width + deltaX)
                        break
                    case "bottom":
                        newHeight = Math.max(MIN_HEIGHT, resizeStart.height + deltaY)
                        break
                    case "bottomRight":
                        newWidth = Math.max(MIN_WIDTH, resizeStart.width + deltaX)
                        newHeight = Math.max(MIN_HEIGHT, resizeStart.height + deltaY)
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
            className={`absolute bg-white border-2 border-gray-400 shadow-lg select-none font-pixelify ${isActive ? "z-50" : "z-40"}`}
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                cursor: isDragging ? "grabbing" : "default",
            }}
            onClick={onFocus}
        >
            {/* Title Bar */}
            <div
                className={`flex items-center justify-between h-6 px-1 border-b border-gray-300 ${
                    isActive ? "bg-gradient-to-b from-gray-200 to-gray-300" : "bg-gradient-to-b from-gray-200 to-gray-300"
                }`}
                onMouseDown={handleMouseDown}
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
                {/* Window Controls */}
                <div className="flex items-center space-x-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            if (onClose) onClose()
                        }}
                        className="w-5 h-5 flex items-center justify-center  "
                    >
                        <X className="w-5 h-5 text-red-600 " />
                    </button>

                </div>

                {/* Title */}
                <div className={`text-s font-medium text-gray-700`}>{title}</div>

                {/* Empty space for balance */}
                <div className="w-12"></div>
            </div>

            {/* Window Content */}
            <div
                ref={contentRef}
                className={` bg-white ${scrollable ? "overflow-auto" : "overflow-hidden"}`}
                style={{height: size.height - 24}}
            >
                {children}
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
