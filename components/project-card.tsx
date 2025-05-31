"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ProjectCardProps = {
  title: string
  description: string
  tags: string[]
  image: string
  delay?: number
}

export function ProjectCard({ title, description, tags, image, delay = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      <Card
        className="overflow-hidden bg-gray-900/50 border-gray-800 backdrop-blur-sm h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-purple-900/30 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex gap-3">
              {/* <Button size="sm" variant="outline" className="rounded-full bg-black/50 border-white/20">
                <Github className="h-4 w-4 mr-1" />
                Code
              </Button> */}
              <Button size="sm" className="rounded-full bg-purple-600 text-white hover:bg-purple-700">
                <ExternalLink className="h-4 w-4 mr-1" />
                En savoir plus
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className="text-gray-300 mb-4 text-sm">{description}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
