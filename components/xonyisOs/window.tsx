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
}

export function MacWindow({
                              title,
                              children,
                              initialPosition = { x: 100, y: 100 },
                              onClose,
                              isActive = false,
                              onFocus,
                              width = 400,
                              height = 300,
                          }: MacWindowProps) {
    const [position, setPosition] = React.useState(initialPosition)
    const [isDragging, setIsDragging] = React.useState(false)
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })
    const windowRef = React.useRef<HTMLDivElement>(null)
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
    const handleMouseDown = (e: React.MouseEvent) => {
        if (onFocus) onFocus()

        // Calculer le décalage par rapport à la position actuelle de la fenêtre
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        })
        setIsDragging(true)
    }

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                // Nouvelle position = position de la souris - décalage initial
                const newX = e.clientX - dragOffset.x
                const newY = e.clientY - dragOffset.y

                // Limiter les fenêtres aux bords de l'écran
                const maxX = window.innerWidth - width
                const maxY = window.innerHeight - height

                setPosition({
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(28, Math.min(newY, maxY)), // 28px pour la barre de menu
                })
            }
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging, dragOffset, width, height, position.x, position.y])

    return (
        <div
            ref={windowRef}
            className={`absolute bg-white border-2 border-gray-400 shadow-lg select-none font-pixelify ${isActive ? "z-50" : "z-40"}`}
            style={{
                left: position.x,
                top: position.y,
                width: width,
                height: height,
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
                        className="w-5 h-5 flex items-center justify-center"
                    >
                        <X className="w-5 h-5 text-red-600" />
                    </button>

                </div>

                {/* Title */}
                <div className={`text-s font-medium text-gray-700`}>{title}</div>

                {/* Empty space for balance */}
                <div className="w-12"></div>
            </div>

            {/* Window Content */}
            <div className=" overflow-auto bg-white" style={{ height: height - 24 }}>
                {children}
            </div>
        </div>
    )
}
