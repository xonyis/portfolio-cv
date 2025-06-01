"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {RotateCw} from "lucide-react"; // Assurez-vous que ce composant existe

const GRID_SIZE = 10
const CELL_SIZE = 20 // pixels, utilisé pour calculer la taille du plateau
const GAME_SPEED_MS = 150 // millisecondes

const initialSnakeCoords = [
    { x: 5, y: 5 }, // Tête
    { x: 4, y: 5 },
    { x: 3, y: 5 }, // Queue
]
const initialDirection = "RIGHT"

// Fonction utilitaire pour obtenir une position aléatoire sur la grille
const getRandomGridPosition = () => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
})

export default function SnakeGamePage() {
    const [snake, setSnake] = useState(initialSnakeCoords)
    const [food, setFood] = useState(() => {
        let foodPos
        do {
            foodPos = getRandomGridPosition()
        } while (initialSnakeCoords.some((seg) => seg.x === foodPos.x && seg.y === foodPos.y))
        return foodPos
    })
    const [direction, setDirection] = useState(initialDirection)
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [isRunning, setIsRunning] = useState(false) // Le jeu ne démarre pas automatiquement
    const [gameStarted, setGameStarted] = useState(false) // Pour suivre si le jeu a déjà commencé

    // Génère une nouvelle position pour la nourriture, en s'assurant qu'elle n'est pas sur le serpent
    const generateNewFoodPosition = useCallback((currentSnake: typeof initialSnakeCoords) => {
        let newFoodPos
        do {
            newFoodPos = getRandomGridPosition()
        } while (currentSnake.some((segment) => segment.x === newFoodPos.x && segment.y === newFoodPos.y))
        return newFoodPos
    }, [])

    // Réinitialise l'état du jeu
    const resetGame = useCallback(() => {
        setSnake(initialSnakeCoords)
        setFood(generateNewFoodPosition(initialSnakeCoords))
        setDirection(initialDirection)
        setScore(0)
        setGameOver(false)
        setIsRunning(true)
        setGameStarted(true)
    }, [generateNewFoodPosition])

    // Gère les entrées clavier pour contrôler le serpent et le jeu
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (gameOver && e.key === "Enter") {
                resetGame()
                return
            }

            if (!gameStarted && (e.key === "Enter" || e.key === " ")) {
                // Démarrer le jeu avec Entrée ou Espace si pas encore commencé
                resetGame()
                return
            }

            if (!isRunning && e.key === " ") {
                // Reprendre si en pause
                if (gameStarted && !gameOver) {
                    setIsRunning(true)
                }
                return
            }

            if (!isRunning || gameOver) return // Ne rien faire si le jeu n'est pas en cours ou est terminé

            const key = e.key
            if ((key === "ArrowUp" || key.toLowerCase() === "z") && direction !== "DOWN") {
                setDirection("UP")
            } else if ((key === "ArrowDown" || key.toLowerCase() === "s") && direction !== "UP") {
                setDirection("DOWN")
            } else if ((key === "ArrowLeft" || key.toLowerCase() === "q") && direction !== "RIGHT") {
                setDirection("LEFT")
            } else if ((key === "ArrowRight" || key.toLowerCase() === "d") && direction !== "LEFT") {
                setDirection("RIGHT")
            } else if (key === " ") {
                // Mettre en pause
                setIsRunning(false)
            }
        },
        [direction, gameOver, isRunning, resetGame, gameStarted],
    )

    // Ajoute et nettoie l'écouteur d'événements clavier
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    // Boucle de jeu principale
    useEffect(() => {
        if (!isRunning || gameOver) {
            return
        }

        const gameInterval = setInterval(() => {
            setSnake((prevSnake) => {
                const currentHead = prevSnake[0]
                let newHead: { x: number; y: number }

                switch (direction) {
                    case "UP":
                        newHead = { x: currentHead.x, y: currentHead.y - 1 }
                        break
                    case "DOWN":
                        newHead = { x: currentHead.x, y: currentHead.y + 1 }
                        break
                    case "LEFT":
                        newHead = { x: currentHead.x - 1, y: currentHead.y }
                        break
                    case "RIGHT":
                        newHead = { x: currentHead.x + 1, y: currentHead.y }
                        break
                    default:
                        return prevSnake
                }

                // Collision avec les murs
                if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                    setGameOver(true)
                    setIsRunning(false)
                    return prevSnake
                }

                // Collision avec soi-même
                if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true)
                    setIsRunning(false)
                    return prevSnake
                }

                const newSnakeArray = [newHead, ...prevSnake]
                let ateFoodThisTick = false

                // Manger la nourriture
                if (newHead.x === food.x && newHead.y === food.y) {
                    ateFoodThisTick = true
                    setScore((s) => s + 1)
                    setFood(generateNewFoodPosition(newSnakeArray))
                }

                if (!ateFoodThisTick) {
                    newSnakeArray.pop() // Enlever la queue si pas de nourriture mangée
                }

                return newSnakeArray
            })
        }, GAME_SPEED_MS)

        return () => clearInterval(gameInterval)
    }, [isRunning, gameOver, direction, food, generateNewFoodPosition])

    const boardWidth = GRID_SIZE * CELL_SIZE
    const boardHeight = GRID_SIZE * CELL_SIZE

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-900 text-white h-full select-none">
            <h1 className="text-4xl font-bold mb-2">Snake</h1>
            <div className="mb-3 text-2xl" aria-live="polite">
                Score: {score}
            </div>

            {!gameStarted && (
                <Button onClick={resetGame} className=" bg-green-600 hover:bg-green-700 text-lg px-6 py-3">
                    Start Game
                </Button>
            )}
            <p className="text-sm text-gray-400 mb-3 h-5">
                {gameStarted && !gameOver && isRunning && "Touches: ZQSD/Flèches "}
                {gameStarted && !gameOver && !isRunning && "Jeu en pause. Espace pour reprendre."}
            </p>

            <div
                className="relative bg-gray-800 border-4 border-gray-700 shadow-2xl"
                style={{
                    width: `${boardWidth}px`,
                    height: `${boardHeight}px`,
                    display: "grid",
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                }}
            >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                    const x = index % GRID_SIZE
                    const y = Math.floor(index / GRID_SIZE)

                    const isSnakeSegment = snake.some((seg) => seg.x === x && seg.y === y)
                    const isFood = food.x === x && food.y === y
                    let cellClass = "border border-gray-700"

                    if (isSnakeSegment) {
                        const isHead = snake[0].x === x && snake[0].y === y
                        cellClass += isHead ? " bg-green-400" : " bg-green-500"
                    } else if (isFood) {
                        cellClass += " bg-red-500"
                    }
                    return <div key={`${x}-${y}`} className={cellClass} />
                })}

                {gameStarted &&
                    !isRunning &&
                    !gameOver && ( // État de pause
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-10">
                            <h2 className="text-4xl font-bold text-yellow-400 mb-6">Paused</h2>
                            <Button
                                onClick={() => setIsRunning(true)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg px-6 py-3"
                            >
                                Resume (Space)
                            </Button>
                        </div>
                    )}

                {gameOver && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-10">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Game Over!</h2>
                        <p className="text-2xl mb-6">Votre Score: {score}</p>
                        <Button onClick={resetGame} className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-6 py-3">
                            <RotateCw /> (Entrée)
                        </Button>
                    </div>
                )}
            </div>
            <div className="mt-6 text-xs text-gray-500">
                <p>Jeu Snake </p>
            </div>
        </div>
    )
}
