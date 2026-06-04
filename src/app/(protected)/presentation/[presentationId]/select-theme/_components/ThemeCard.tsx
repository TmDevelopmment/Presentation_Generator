"use client"

import { Theme } from '@/lib/types'
import React from 'react'
import { AnimationControls, motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

type Props = {
    title: string
    description: string
    content: React.ReactNode
    variant: 'left' | 'main' | 'right'
    theme: Theme
    controls: AnimationControls
}

const ThemeCard = ({ title, description, content, variant, theme, controls }: Props) => {

    const variants = {
        left: {
            hidden: { opacity: 0, x: "-50%", y: "-50%", scale: 0.8, rotate: 0 },
            visible: {
                opacity: 1,
                x: "-25%",
                y: "-25%",
                scale: 0.95,
                rotate: -10,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1
                },
            },
        },
        right: {
            hidden: { opacity: 0, x: "-50%", y: "-50%", scale: 0.8, rotate: 0 },
            visible: {
                opacity: 1,
                x: "-25%",
                y: "-25%",
                scale: 0.95,
                rotate: -10,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1
                },
            },
        },
        main: {
            hidden: {
                opacity: 0, scale: 0.8,
            },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2
                },
            },
        },
    }

    return (
        <motion.div
        initial="hidden"
        animate={controls}
        variants={variants[variant]}
        className="absolute w-full max-w-3xl"
        style={{ zIndex: variant === "main" ? 10 : 0 }}>
            <Card
            className="h-full shadow-2xl background-blur-sm"
            style={{
                backgroundColor: theme.sidebarColor,
                border: `1px solid ${theme.accentColor}20`,
            }}>
                <div className="flex flex-col md:flex-row">
                    <CardContent className="flex-1 p-8 space-y-6">
                        <div className="space-y-3">
                            <h2
                            className="text-3xl font-bold tracking-tight"
                            style={{ color: theme.accentColor }}>
                                {title}
                            </h2>
                            <p
                            className="text-lg"
                            style={{ color: `${theme.accentColor}90` }}>
                                {description}
                            </p>
                        </div>
                        {content}
                    </CardContent>
                    <div
                    className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg">
                        <Image
                        src="https://via.placeholder.com/600x400.png?text=Theme+Preview"
                        alt="Theme Image"
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}

export default ThemeCard