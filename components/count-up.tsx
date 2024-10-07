'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation, Variant } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CountUpProps {
  target: number
  duration?: number
  decimals?: number
  title?: string
  colorScheme?: 'blue' | 'green' | 'red'
}

const colorSchemes = {
  blue: {
    text: 'from-blue-500 via-blue-600 to-indigo-700',
    circle: 'text-blue-600',
  },
  green: {
    text: 'from-green-500 via-emerald-600 to-teal-700',
    circle: 'text-emerald-600',
  },
  red: {
    text: 'from-red-500 via-rose-600 to-pink-700',
    circle: 'text-rose-600',
  },
}

export function CountUp({ target, duration = 2000, decimals = 0, title, colorScheme = 'blue' }: CountUpProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const countVariants: { [key: string]: Variant } = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    completed: { scale: [1, 1.5, 1] },
  }

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null
      let animationFrameId: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)
        
        setCount(percentage * target)

        if (percentage < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          controls.start('completed')
        }
      }

      setCount(0)
      controls.start('visible')
      animationFrameId = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(animationFrameId)
    } else {
      setCount(0)
      controls.start('hidden')
    }
  }, [inView, target, duration, controls])

  const { text: textColor, circle: circleColor } = colorSchemes[colorScheme]

  return (
    <div ref={ref} className="flex flex-col items-center justify-center">
      {title && <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full">
          <circle
            className="text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="88"
            cx="96"
            cy="96"
          />
          <circle
            className={circleColor}
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="88"
            cx="96"
            cy="96"
            strokeLinecap="round"
            strokeDasharray="552.9"
            strokeDashoffset={552.9 * (1 - count / target)}
          />
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial="hidden"
          animate={controls}
          variants={countVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className={`text-6xl font-bold bg-gradient-to-br ${textColor} text-transparent bg-clip-text`}>
            {count.toFixed(decimals)}%
          </span>
        </motion.div>
      </div>
    </div>
  )
}