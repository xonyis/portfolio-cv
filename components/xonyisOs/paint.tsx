"use client"

import { useRef, useState, useEffect, type MouseEvent, type TouchEvent } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brush, Eraser, Download, Trash2, Palette } from "lucide-react"

export default function PaintApp() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("#000000")
    const [brushSize, setBrushSize] = useState([5])
    const [tool, setTool] = useState<"brush" | "eraser">("brush")
    const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        canvas.width = 800
        canvas.height = 600

        // Set initial canvas background to white
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Set drawing properties
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
    }, [])

    const startDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
        draw(e)
    }

    const draw = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height

        let clientX: number, clientY: number

        if ("touches" in e) {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else {
            clientX = e.clientX
            clientY = e.clientY
        }

        const x = (clientX - rect.left) * scaleX
        const y = (clientY - rect.top) * scaleY

        ctx.lineWidth = brushSize[0]

        if (tool === "eraser") {
            ctx.globalCompositeOperation = "destination-out"
        } else {
            ctx.globalCompositeOperation = "source-over"
            ctx.strokeStyle = color
        }

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const stopDrawing = () => {
        if (!isDrawing) return
        setIsDrawing(false)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.beginPath()
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const downloadImage = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const link = document.createElement("a")
        link.download = "mon-dessin.png"
        link.href = canvas.toDataURL()
        link.click()
    }
    const rgbToHex = (r: number, g: number, b: number) => {
        return (
            "#" +
            [r, g, b]
                .map((x) => {
                    const hex = x.toString(16)
                    return hex.length === 1 ? "0" + hex : hex
                })
                .join("")
        )
    }
    const updateRgbValue = (component: "r" | "g" | "b", value: number) => {
        const newRgb = { ...rgbValues, [component]: value }
        setRgbValues(newRgb)
        setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                <Card className="mb-4 bg-neutral-900">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="w-6 h-6" />
                            Application de Dessin
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-4">
                            {/* Taille du pinceau */}
                            <div className="flex items-center gap-2 min-w-[150px]">
                                <span className="text-sm font-medium">Taille:</span>
                                <Slider value={brushSize} onValueChange={setBrushSize} max={50} min={1} step={1}
                                        className="flex-1"/>
                                <span className="text-sm w-8">{brushSize[0]}</span>
                            </div>

                            <Separator orientation="vertical" className="h-8" />

                            {/* Couleurs */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-medium">Couleur:</span>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-8 h-8 rounded border cursor-pointer"
                                />
                                <div className="flex flex-col gap-2 min-w-[200px]">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-red-600 w-4">R:</span>
                                        <Slider
                                            value={[rgbValues.r]}
                                            onValueChange={(value) => updateRgbValue("r", value[0])}
                                            max={255}
                                            min={0}
                                            step={1}
                                            className="flex-1"
                                        />
                                        <span className="text-xs w-8 text-right">{rgbValues.r}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-green-600 w-4">G:</span>
                                        <Slider
                                            value={[rgbValues.g]}
                                            onValueChange={(value) => updateRgbValue("g", value[0])}
                                            max={255}
                                            min={0}
                                            step={1}
                                            className="flex-1"
                                        />
                                        <span className="text-xs w-8 text-right">{rgbValues.g}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-blue-600 w-4">B:</span>
                                        <Slider
                                            value={[rgbValues.b]}
                                            onValueChange={(value) => updateRgbValue("b", value[0])}
                                            max={255}
                                            min={0}
                                            step={1}
                                            className="flex-1"
                                        />
                                        <span className="text-xs w-8 text-right">{rgbValues.b}</span>
                                    </div>
                                </div>

                            </div>

                            <Separator orientation="vertical" className="h-8"/>



                            {/* Actions */}
                            <div className="flex gap-2">
                                <Button className="bg-neutral-200 text-black" variant="outline" size="sm"
                                        onClick={clearCanvas}>
                                    <Trash2 className="w-4 h-4 mr-2 text-black"/>
                                    Effacer
                                </Button>
                                <Button className="bg-neutral-200 text-black" variant="outline" size="sm"
                                        onClick={downloadImage}>
                                    <Download className="w-4 h-4 mr-2 text-black"/>
                                    Télécharger
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Canvas */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex justify-center">
                            <canvas
                                ref={canvasRef}
                                className="border border-gray-300 rounded-lg cursor-crosshair max-w-full h-auto"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                                style={{ touchAction: "none" }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Cliquez et faites glisser pour dessiner • Utilisez les outils ci-dessus pour personnaliser votre dessin</p>
                </div>
            </div>
        </div>
    )
}
