"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, Calendar, ArrowDown, ArrowDown01Icon, CircleChevronDown, CircleChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function CyclingSingleMyth() {
  const [activeIndex, setActiveIndex] = useState(0)

  const myths = [
    {
      icon: <Clock className="h-12 w-12 text-blue-500" />,
      title: "Overtime is only for hours worked beyond 40 in a week",
      description: "Overtime can also apply to hours worked beyond 8 in a day in some states, or for work on weekends or holidays, depending on local laws."
    },
    {
      icon: <DollarSign className="h-12 w-12 text-green-500" />,
      title: "Salaried employees are never entitled to overtime",
      description: "Many salaried employees are still eligible for overtime pay, depending on their job duties and salary level."
    },
    {
      icon: <Calendar className="h-12 w-12 text-red-500" />,
      title: "Employers can average hours over two weeks to avoid overtime",
      description: "Generally, overtime must be calculated on a weekly basis. Averaging over multiple weeks is not allowed in most cases."
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % myths.length)
    }, 8000) // Change card every 8 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [myths.length])

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + myths.length) % myths.length)
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % myths.length)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="relative overflow-hidden mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="flex flex-col min-h-[350px]">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  {myths[activeIndex].icon}
                </div>
                <CardTitle className="text-2xl text-center">
                  <span className="text-primary font-semibold">Myth: </span>
                  {myths[activeIndex].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center">
                <p className="text-center text-lg text-muted-foreground">{myths[activeIndex].description}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          onClick={handlePrevious}
          aria-label="Previous myth"
        >
          <CircleChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          onClick={handleNext}
          aria-label="Next myth"
        >
          <CircleChevronUp className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="font-semibold">
          Learn More
        </Button>
      </div>
    </div>
  )
}