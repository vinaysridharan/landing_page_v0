'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
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

  const words = ['Empowering', 'Workers,', 'Ensuring', 'Fair', 'Compensation']

  return (
    <div className="relative overflow-hidden py-12">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="h-full w-full" />
      </motion.div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Most Americans work over 40 hours a week. Few get paid overtime wages. <span className="text-blue-800 font-bold"> <br></br>It's time to fight back.</span>      </p>
        </motion.div>
      </div>
    </div>
  )
}