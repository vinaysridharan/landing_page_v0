'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, DollarSign, Users, Brain, Briefcase, HardHat, Laptop, Stethoscope, Gavel, Star } from "lucide-react"
export default function HeroHeadline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }


  const words = ['Empowering', 'Workers,', 'Ensuring', 'Fair', 'Compensation']

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center tracking-tight"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2 md:mr-3"
            variants={wordVariants}
          >
            {index === 0 || index === 3 ? (
              <span className="text-blue-800">{word}</span>
            ) : (
              <span className="text-gray-900">{word}</span>
            )}
          </motion.span>
        ))}
      </motion.h1>
      {/* <Image src="/We_Help_SVG.svg" alt="Hero Image" width={500} height={500} /> */}

      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p className="text-lg md:text-xl text-gray-600 ">
          Most Americans work over 40 hours a week. Few get paid overtime wages. <span className="text-blue-800 font-bold"> <br></br>It's time to fight back.</span>      </p>
      </motion.div>
      <motion.div variants={slideUp} className="flex justify-center">
        <Button size="lg" className="bg-blue-500 mb-10 hover:bg-blue-600 text-white rounded-full text-lg px-8 shadow-lg transform transition-transform duration-200 hover:scale-105" onClick={() => setStep(2)}>
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  )
}