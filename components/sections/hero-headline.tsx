/* eslint-disable react/no-unescaped-entities */
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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

  // const words = ['Empowering', 'Workers,', 'Ensuring', 'Fair', 'Compensation']
  const words = ['Overworked?', 'Underpaid?', 'We', 'Can', 'Help']
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-[40px] shadow-2xl">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-[170%] object-cover"
        style={{ 
          minWidth: '100%', 
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'center', // Move the focus point to the bottom
        }}
      >
        {/* Media query styles can be applied using CSS classes or inline styles */}
        <style jsx>{`
          @media (max-width: 500px) {
            video {
              transform: scale(1.2);
            }
          }
          @media (min-width: 500px) and (max-width: 1024px) {
            video {
              transform: scale(2.5) translateY(20%);
            }
          }
          @media (min-width: 1025px) {
            video {
              transform: scale(2) translateY(10%);
            }
          }
        `}</style>
        <source src="/worker_video_2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-start gap-10 h-full p-10">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-start tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-5 mb-3"
              variants={wordVariants}
            >
              {index === 0 || index === 1 ? (
                <span className="text-indigo-400">{word}</span>
              ) : (
                <span className="text-white">{word}</span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          className="text-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-lg md:text-xl text-white">
            Most Americans work over 40 hours a week. Few get paid overtime wages. <span className="text-indigo-400 font-bold"><br></br>It's time to fight back.</span>
          </p>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 rounded-full text-lg px-8 py-6 font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              // Logic to scroll to the case assessment form and expand it to take up the whole screen
              const caseAssessmentForm = document.getElementById('CaseAssessmentForm');
              if (caseAssessmentForm) {
                caseAssessmentForm.scrollIntoView({ behavior: 'smooth' });
                caseAssessmentForm.style.width = '100vw';
                caseAssessmentForm.style.height = '100vh';
              }
            }}
          >
            Get Your Instant Case Review
            <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}