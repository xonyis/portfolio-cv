"use client"

import { useState } from "react"

export default function CalculatriceRetro() {
    const [display, setDisplay] = useState("0")
    const [storedValue, setStoredValue] = useState<number | null>(null)
    const [operator, setOperator] = useState<string | null>(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit)
            setWaitingForOperand(false)
        } else {
            setDisplay(display === "0" ? digit : display + digit)
        }
    }

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay("0.")
            setWaitingForOperand(false)
            return
        }

        if (!display.includes(".")) {
            setDisplay(display + ".")
        }
    }

    const clearDisplay = () => {
        setDisplay("0")
        setWaitingForOperand(false)
    }

    const clearAll = () => {
        setDisplay("0")
        setStoredValue(null)
        setOperator(null)
        setWaitingForOperand(false)
    }

    const handleOperator = (nextOperator: string) => {
        const inputValue = Number.parseFloat(display)

        if (storedValue === null) {
            setStoredValue(inputValue)
        } else if (operator) {
            const result = performCalculation(storedValue, inputValue, operator)
            setDisplay(String(result))
            setStoredValue(result)
        }

        setWaitingForOperand(true)
        setOperator(nextOperator)
    }

    const performCalculation = (firstOperand: number, secondOperand: number, operator: string) => {
        switch (operator) {
            case "+":
                return firstOperand + secondOperand
            case "-":
                return firstOperand - secondOperand
            case "×":
                return firstOperand * secondOperand
            case "÷":
                return firstOperand / secondOperand
            default:
                return secondOperand
        }
    }

    const handleEquals = () => {
        if (storedValue === null || operator === null) {
            return
        }

        const inputValue = Number.parseFloat(display)
        const result = performCalculation(storedValue, inputValue, operator)

        setDisplay(String(result))
        setStoredValue(null)
        setOperator(null)
        setWaitingForOperand(true)
    }

    return (
        <div className="mx-auto max-w-full">
            {/* Corps principal avec effet métallique */}
            <div
                className="pt-0 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 p-4 shadow-2xl  border-gray-300"
                style={{
                    boxShadow:
                        "inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.3)",
                }}
            >
                {/* Boutons de contrôle du haut */}
                <div className="mb-4 flex justify-between">
                    <div className="text-sm text-red-600 font-bold">XON CALC 2.7</div>
                    <div className="flex gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-800"></div>
                        <div className="h-2 w-2 rounded-full bg-gray-800"></div>
                    </div>
                </div>

                {/* Écran LCD */}
                <div className="mb-2 rounded-lg bg-black p-4 shadow-inner border-2 border-gray-600">
                    <div className="text-xs text-red-500 font-bold mb-1">8BitDo RETRO NUMPAD</div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="text-red-500 font-mono text-2xl font-bold tracking-wider">{display.padStart(4, "0")}</div>
                        <div className="text-red-500 font-mono text-lg">10 18</div>
                    </div>
                    <div className="flex justify-between text-xs text-red-500">
                        <span>SOC(%)</span>
                        <span>INPUT(W)</span>
                    </div>
                </div>

                {/* Pavé numérique */}
                <div className="rounded-lg bg-gray-700 p-3 shadow-inner">
                    <div className="grid grid-cols-4 gap-2">
                        {/* Première rangée */}
                        <button
                            onClick={clearDisplay}
                            className="h-12 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner"
                        >
                            C
                        </button>
                        <button
                            onClick={() => handleOperator("÷")}
                            className="h-12 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner"
                        >
                            ÷
                        </button>
                        <button
                            onClick={() => handleOperator("×")}
                            className="h-12 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner"
                        >
                            ×
                        </button>
                        <button
                            onClick={clearAll}
                            className="h-12 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner"
                        >
                            ←
                        </button>

                        {/* Deuxième rangée */}
                        <button
                            onClick={() => inputDigit("7")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            7
                        </button>
                        <button
                            onClick={() => inputDigit("8")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            8
                        </button>
                        <button
                            onClick={() => inputDigit("9")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            9
                        </button>
                        <button
                            onClick={() => handleOperator("-")}
                            className="h-12 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner"
                        >
                            -
                        </button>

                        {/* Troisième rangée */}
                        <button
                            onClick={() => inputDigit("4")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            4
                        </button>
                        <button
                            onClick={() => inputDigit("5")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            5
                        </button>
                        <button
                            onClick={() => inputDigit("6")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            6
                        </button>
                        <button
                            onClick={() => handleOperator("+")}
                            className="h-12 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner"
                        >
                            +
                        </button>

                        {/* Quatrième rangée */}
                        <button
                            onClick={() => inputDigit("1")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            1
                        </button>
                        <button
                            onClick={() => inputDigit("2")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            2
                        </button>
                        <button
                            onClick={() => inputDigit("3")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            3
                        </button>
                        <button
                            onClick={handleEquals}
                            className="h-26 rounded-md bg-gray-600 text-red-500 font-bold shadow-md hover:bg-gray-500 active:shadow-inner row-span-2 flex items-center justify-center"
                            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                        >
                            ENTER
                        </button>

                        {/* Cinquième rangée */}
                        <button
                            onClick={() => inputDigit("0")}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner col-span-2"
                        >
                            0
                        </button>
                        <button
                            onClick={inputDecimal}
                            className="h-12 rounded-md bg-gray-200 text-red-600 font-bold shadow-md hover:bg-gray-100 active:shadow-inner"
                        >
                            .
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
