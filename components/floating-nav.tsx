"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

type FloatingNavProps = {
    navItems: { name: string; href: string }[]
    activeSection: string
}

export function FloatingNav({ navItems, activeSection }: FloatingNavProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href)
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
        setIsOpen(false)
    }

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            {/* Desktop Navigation */}
            <nav className="hidden sm:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800/30 backdrop-blur-lg border border-gray-800/50 rounded-full px-4 py-2 shadow-lg">
                <ul className="flex space-x-1">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1)

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "px-3 py-2 text-sm rounded-xl relative block transition-all duration-200 whitespace-nowrap",
                                        isActive ? "text-white" : "text-gray-400 hover:text-gray-200",
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleNavClick(item.href)
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

            {/* Mobile Navigation */}
            <div className="block sm:hidden fixed top-4 left-4 right-4 z-50">
                <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-800/50 rounded-2xl shadow-lg">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="text-white font-medium text-sm">Navigation</div>
                        <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-gray-400 hover:text-white transition-colors">
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-2 pb-3">
                            <ul className="space-y-1">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.href.substring(1)

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "px-3 py-2.5 text-sm rounded-xl relative block transition-all duration-200 w-full",
                                                    isActive ? "text-white" : "text-gray-400 hover:text-gray-200",
                                                )}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleNavClick(item.href)
                                                }}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeSectionMobile"
                                                        className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl -z-10"
                                                        transition={{ type: "spring", duration: 0.6 }}
                                                    />
                                                )}
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tablet Navigation - Compact horizontal version */}
            {/*<nav className="hidden sm:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800/30 backdrop-blur-lg border border-gray-800/50 rounded-2xl px-3 py-2 shadow-lg max-w-[90vw]">*/}
            {/*    <ul className="flex space-x-1 overflow-x-auto scrollbar-hide">*/}
            {/*        {navItems.map((item) => {*/}
            {/*            const isActive = activeSection === item.href.substring(1)*/}

            {/*            return (*/}
            {/*                <li key={item.href} className="flex-shrink-0">*/}
            {/*                    <Link*/}
            {/*                        href={item.href}*/}
            {/*                        className={cn(*/}
            {/*                            "px-2.5 py-1.5 text-xs rounded-xl relative block transition-all duration-200 whitespace-nowrap",*/}
            {/*                            isActive ? "text-white" : "text-gray-400 hover:text-gray-200",*/}
            {/*                        )}*/}
            {/*                        onClick={(e) => {*/}
            {/*                            e.preventDefault()*/}
            {/*                            handleNavClick(item.href)*/}
            {/*                        }}*/}
            {/*                    >*/}
            {/*                        {isActive && (*/}
            {/*                            <motion.div*/}
            {/*                                layoutId="activeSectionTablet"*/}
            {/*                                className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-xl -z-10"*/}
            {/*                                transition={{ type: "spring", duration: 0.6 }}*/}
            {/*                            />*/}
            {/*                        )}*/}
            {/*                        {item.name}*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </ul>*/}
            {/*</nav>*/}
        </motion.div>
    )
}
