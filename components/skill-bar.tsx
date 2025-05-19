"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SkillBarProps = {
  name: string
  value: number
  color: "purple" | "blue" | "indigo" | "violet" | "cyan" | "teal" | "green"
}

const colorMap = {
  purple: "from-purple-600 to-purple-400",
  blue: "from-blue-600 to-blue-400",
  indigo: "from-indigo-600 to-indigo-400",
  violet: "from-violet-600 to-violet-400",
  cyan: "from-cyan-600 to-cyan-400",
  teal: "from-teal-600 to-teal-400",
  green: "from-green-600 to-green-400",
}

export function SkillBar({ name, value, color }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-sm text-gray-400">{value}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${value}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", colorMap[color])}
        />
      </div>
    </div>
  )
}
