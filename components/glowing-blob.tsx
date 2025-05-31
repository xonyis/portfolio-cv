"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type GlowingBlobProps = {
  className?: string
  color: "purple" | "blue" | "cyan" | "pink"
  size: "sm" | "md" | "lg" | "xl"
  followMouse?: boolean
}

const colorMap = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  darkPurple: "bg-purple-800",

}

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[30rem] h-[30rem]",
  xxl: "w-[40rem] h-[40rem]",
}

export function GlowingBlob({ className, color, size, followMouse = true }: GlowingBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!followMouse) return
    const blob = blobRef.current
    if (!blob) return

    const position = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const speed = 0.1

    const updatePosition = () => {
      position.x += (target.x - position.x) * speed
      position.y += (target.y - position.y) * speed

      blob.style.transform = `translate(${position.x}px, ${position.y}px)`

      requestAnimationFrame(updatePosition)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = blob.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Calculate distance from center
      target.x = (clientX - centerX) * 0.075
      target.y = (clientY - centerY) * 0.075
    }

    window.addEventListener("mousemove", handleMouseMove)
    updatePosition()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [followMouse])

  return (
      <motion.div
          ref={blobRef}
          className={cn(
              "rounded-full opacity-60 mix-blend-screen filter blur-3xl",
              colorMap[color],
              sizeMap[size],
              className,
          )}
          animate={{
            scale: [1, 1.1, 1],
            borderRadius: [
              "60% 40% 30% 70%",
              "40% 60% 70% 30%",
              "60% 40% 30% 70%",
            ],
            ...(followMouse && { y: [0, -40, 0, 40, 0] }),
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
      />
  )
}
