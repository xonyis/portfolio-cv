"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

type FloatingNavProps = {
  navItems: { name: string; href: string }[]
  activeSection: string
}

export function FloatingNav({ navItems, activeSection }: FloatingNavProps) {
  return (
      <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full "
      >
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800/30 backdrop-blur-lg border border-gray-800/50 rounded-full px-4 py-2 shadow-lg">
          <ul className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)

              return (
                  <li key={item.href}>
                    <Link
                        href={item.href}
                        className={cn(
                            "px-3 py-2 text-sm rounded-full relative block transition-all duration-200",
                            isActive ? "text-white" : "text-gray-400 hover:text-gray-200",
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          document.querySelector(item.href)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                        }}
                    >
                      {isActive && (
                          <motion.div
                              layoutId="activeSection"
                              className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-full -z-10"
                              transition={{ type: "spring", duration: 0.6 }}
                          />
                      )}
                      {item.name}
                    </Link>
                  </li>
              )
            })}
          </ul>
        </nav>
      </motion.div>
  )
}
