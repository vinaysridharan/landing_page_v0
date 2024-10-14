'use client'
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
/**
 * Page component for the "How it works" section.
 * 
 * This component renders a responsive layout explaining the process
 * using a series of images and descriptions.
 * 
 * @returns {JSX.Element} The rendered "How it works" page
 */
export default function Page() {
  const steps = [
    { src: "/howitworks/Fill_Form_SVG.svg", alt: "Fill Form", description: "Fill out our simple form" },
    { src: "/howitworks/Meet_Lawyer_SVG.svg", alt: "Meet Lawyer", description: "Meet with a specialized lawyer" },
    { src: "/howitworks/Lawyer_Negotiates_Settlement_SVG.svg", alt: "Lawyer Negotiates Settlement", description: "Your lawyer negotiates a settlement" },
    { src: "/howitworks/Receive_Settlement_SVG.svg", alt: "Receive Settlement", description: "Receive your settlement" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Header /> */}
      {/* <AnimatePresence> */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-indigo-900">How it works</h1>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {steps.map((step, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div key={index} className="site-card-bg rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center">
              <Image
                src={step.src}
                alt={step.alt}
                width={200}
                height={200}
                className="mb-4"
              />
              <p className="text-lg text-white font-semibold">{step.description}</p>
              <ChevronRight className="h-6 w-6 text-white mt-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}