"use client"

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { CyclingSingleMyth } from '@/components/ui/cycling-single-myth'
interface Hero2Props {
  scrollToForm?: () => void
}

// const COMPANY_LOGOS = ['amazon.svg', 'walmart.svg', 'target.svg', 'mcdonalds.svg'] as const

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

// const slideUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
// }

// const zoomIn = {
//   hidden: { opacity: 0.8, scale: 0.8 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 5, ease: 'easeOut' },
//   },
// }

export function Hero2({ scrollToForm }: Hero2Props) {
 
  const handleScrollToForm = useCallback(() => {
    scrollToForm?.()
  }, [scrollToForm])

  return (
    <section className="relative w-full bg-gradient-to-br from-indigo-900 to-indigo-600 flex justify-center items-center">
      <div className="mx-5 container flex flex-col md:flex-row items-center justify-between mt-20 px-50 gap-10">
        <HeroContent onScrollToForm={handleScrollToForm} />
        <div className="w-full md:w-1/2 flex justify-end">
          <div className="relative w-full h-[500px]">
            <CyclingSingleMyth />
            {/* <Image
              src="/We_Help_SVG.svg"
              alt="We Help Cartoon"
              layout="fill"
              objectFit="contain"
              className="w-full h-full object-position-top"
            /> */}
          </div>
        </div>
      </div>
    </section>
  )
}

// function VideoBackground({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
//   return (
//     <div className='w-1/2 flex justify-end'>
//       <div className="w-1/2 h-[500px] relative overflow-hidden rounded-lg shadow-2xl my-10">
//         <video
//           ref={videoRef}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-[150%] object-cover object-center"
//         >
//           <source src="/worker_video_2.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className="absolute inset-0 bg-blue-900 bg-opacity-30"></div>
//       </div>
//     </div>
//   )
// }

function HeroContent({ onScrollToForm }: { onScrollToForm: () => void }) {
  return (
    <div className="text-left w-full md:w-1/2">

      <motion.h2
        className="text-xl md:text-3xl lg:text-4xl font-semibold text-white mb-8"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        You may be wrongly denied overtime pay<span className='text-blue-200'>...and not even know it.</span>
      </motion.h2>
      <motion.p
        className="text-lg text-white mb-12"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        If you&apos;ve worked over 40 hours a week and not been paid overtime, your employer or former employer may owe you significant compensation. The top 10 wage & hour cases in 2023 recovered{' '}
        <span className="font-bold text-yellow-400">over $740 million</span> in unpaid wages for workers like you.
        It&apos;s time to stand up for your rights and secure your fair compensation.
      </motion.p>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5 }}
        className="mb-16"
      >
        <Button
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 rounded-full text-lg px-8 py-6 font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={onScrollToForm}
        >
          Get Your Instant Case Review
          <ChevronRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Button>
      </motion.div>
    </div>
  )
}

// function RatingStars() {
//   return (
//     <motion.div
//       className="flex flex-col items-start"
//       variants={fadeIn}
//       initial="hidden"
//       animate="visible"
//       transition={{ delay: 2 }}
//     >
//       <div className="flex space-x-1 mb-2">
//         {Array.from({ length: 5 }, (_, index) => (
//           <Star key={index} className="h-6 w-6 text-yellow-400 fill-current" aria-hidden="true" />
//         ))}
//       </div>
//       <p className="text-blue-200 text-lg font-medium">
//         Rated 4.9/5 by over 1,000 satisfied clients
//       </p>
//     </motion.div>
//   )
// }

// function TrustedCompanies() {
//   return (
//     <motion.div
//       className="mt-20"
//       variants={slideUp}
//       initial="hidden"
//       animate="visible"
//       transition={{ delay: 3 }}
//     >
//       <p className="text-blue-200 mb-6 text-lg font-medium">Trusted by workers from leading companies:</p>
//       <div className="flex flex-wrap justify-start items-center gap-6 bg-white bg-opacity-10 rounded-lg p-6">
//         {COMPANY_LOGOS.map((logo, index) => (
//           <div key={index} className="relative w-24 h-12">
//             <Image
//               src={`/logos/${logo}`}
//               alt={`${logo.split('.')[0]} logo`}
//               layout="fill"
//               objectFit="contain"
//               className="filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
//             />
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   )
// }