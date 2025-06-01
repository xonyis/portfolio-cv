"use client"

import { useState } from "react"

export default function Calculatrice() {
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

    const toggleSign = () => {
        const value = Number.parseFloat(display)
        setDisplay(String(-value))
    }

    const calculatePercentage = () => {
        const value = Number.parseFloat(display)
        setDisplay(String(value / 100))
    }

    return (
        <div className="mx-auto max-w-xs">
            <div className="rounded-t-lg bg-gray-500 p-3 shadow-inner">

                <div className="flex font-pixelify h-16 items-center justify-end overflow-hidden rounded bg-gray-200 px-2 font-mono text-right text-3xl text-[#3a3a3a] shadow-inner">
                    {display}
                </div>
            </div>
            <div className="rounded-b-lg bg-gray-300 p-2 shadow-lg">
                <div className="grid grid-cols-4 gap-1">
                    <button
                        onClick={clearAll}
                        className="rounded-md bg-[#e87461] px-4 py-3 text-white shadow-md hover:bg-[#d86450] active:translate-y-0.5"
                    >
                        AC
                    </button>
                    <button
                        onClick={clearDisplay}
                        className="rounded-md bg-[#e87461] px-4 py-3 text-white shadow-md hover:bg-[#d86450] active:translate-y-0.5"
                    >
                        C
                    </button>
                    <button
                        onClick={calculatePercentage}
                        className="rounded-md bg-[#e0a458] px-4 py-3 text-white shadow-md hover:bg-[#d09448] active:translate-y-0.5"
                    >
                        %
                    </button>
                    <button
                        onClick={() => handleOperator("÷")}
                        className="rounded-md bg-[#e0a458] px-4 py-3 text-white shadow-md hover:bg-[#d09448] active:translate-y-0.5"
                    >
                        ÷
                    </button>
                    <button
                        onClick={() => inputDigit("7")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        7
                    </button>
                    <button
                        onClick={() => inputDigit("8")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        8
                    </button>
                    <button
                        onClick={() => inputDigit("9")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        9
                    </button>
                    <button
                        onClick={() => handleOperator("×")}
                        className="rounded-md bg-[#e0a458] px-4 py-3 text-white shadow-md hover:bg-[#d09448] active:translate-y-0.5"
                    >
                        ×
                    </button>
                    <button
                        onClick={() => inputDigit("4")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        4
                    </button>
                    <button
                        onClick={() => inputDigit("5")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        5
                    </button>
                    <button
                        onClick={() => inputDigit("6")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        6
                    </button>
                    <button
                        onClick={() => handleOperator("-")}
                        className="rounded-md bg-[#e0a458] px-4 py-3 text-white shadow-md hover:bg-[#d09448] active:translate-y-0.5"
                    >
                        -
                    </button>
                    <button
                        onClick={() => inputDigit("1")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        1
                    </button>
                    <button
                        onClick={() => inputDigit("2")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        2
                    </button>
                    <button
                        onClick={() => inputDigit("3")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        3
                    </button>
                    <button
                        onClick={() => handleOperator("+")}
                        className="rounded-md bg-[#e0a458] px-4 py-3 text-white shadow-md hover:bg-[#d09448] active:translate-y-0.5"
                    >
                        +
                    </button>
                    <button
                        onClick={toggleSign}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        +/-
                    </button>
                    <button
                        onClick={() => inputDigit("0")}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        0
                    </button>
                    <button
                        onClick={inputDecimal}
                        className="rounded-md bg-[#d8d0c5] px-4 py-3 text-[#3a3a3a] shadow-md hover:bg-[#c8c0b5] active:translate-y-0.5"
                    >
                        .
                    </button>
                    <button
                        onClick={handleEquals}
                        className="rounded-md bg-[#e0a458] px-4 py-3 text-white shadow-md hover:bg-[#d09448] active:translate-y-0.5"
                    >
                        =
                    </button>
                </div>
            </div>
        </div>
    )
}
