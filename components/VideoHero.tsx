import { useRef } from 'react'
import { motion } from 'framer-motion'

interface VideoHeroProps {
  videoSrc: string;
}

export function VideoHero({ videoSrc }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const zoomIn = {
    hidden: { opacity: .3, scale: 0.7 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 5, ease: "easeOut" } 
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-16">
      <motion.div className="max-w-xl text-center md:text-left mb-8 md:mb-0 md:mr-8">
        <h2 className="text-5xl md:text-6xl font-bold text-blue-900 mb-4">
          Overworked and Underpaid?
        </h2>
      </motion.div>
      <motion.div 
        className="w-full md:w-1/2 h-[500px] relative overflow-hidden rounded-3xl"
        variants={slideUp}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-[130%] h-[180%] object-cover object-center"
          style={{ transform: 'scale(1.05)' }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gray-500 bg-opacity-30 flex-cols items-start justify-center pt-16">
        <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-40"
            variants={zoomIn}
          >
            Overworked and Underpaid?
          </motion.h1>
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            variants={zoomIn}
          >
            It Doesn't Have To Be This Way
          </motion.h1>
        </div>
      </motion.div>
    </div>
  )
}