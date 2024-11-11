/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, CheckCircle, DollarSign, Users, Brain, Briefcase, HardHat, Laptop, Stethoscope, Star } from "lucide-react"
import Image from 'next/image'
import { Hero2 } from './sections/Hero2'
import { CaseAssessmentForm } from './sections/case-assessment-form'
import { Statistics } from './sections/Statistics'
import HeroHeadline from './sections/hero-headline'
import { QuoteComponent } from './sections/quote-component'
import { Footer } from './sections/Footer' // Import the Footer component
export default function AnimatedLandingPageComponent() {
  const [step, setStep] = useState(1)
  const [industry, setIndustry] = useState("")

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1.1, transition: { duration: 3 } }
  }

  return (
    <div className="min-h-screen w-full text-black">

      <main className="w-full">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
            >
              <div className='relative min-h-screen w-full flex justify-center px-4'>
                <div className='container flex flex-col lg:flex-row justify-between items-center gap-10'>
                  <div className='w-full lg:w-1/2 mb-10 lg:mb-0'>
                    <HeroHeadline />

                  </div>
                  <div className='w-full lg:w-1/2 mb-10 lg:mb-0'>
                    <CaseAssessmentForm />
                  </div>
                </div>
              </div>
              {/* <UserIntakeForm /> */}
              <Hero2 scrollToForm={() => setStep(2)} />

              {/* </section> */}
              <section className="Statistics flex justify-center items-center my-10">
                <div className='container flex flex-col gap-10'>
                  <div className='flex flex-col gap-5'>
                    <motion.h2
                      className="text-3xl lg:text-4xl font-semibold text-blue-900 text-center mt-20"
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      You've worked hard. Let's secure what you deserve.
                    </motion.h2>
                    {/* <ArticlePreviewComponent url="https://www.cnn.com/weather/live-news/hurricane-milton-florida-damage-10-11-24/index.html" /> */}
                    <motion.p
                      className="text-xl text-slate text-center mx-auto w-1/2"
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                    >
                      Worker misclassification is alarmingly common, affecting millions of Americans each year. Many employees are unaware of their rights and the wages they're legally entitled to. <span className='text-indigo-700 font-semibold'>That's where we come in.</span>
                    </motion.p>
                  </div>
                  <Statistics />
                </div>
              </section>

              <motion.div className='my-10 w-full overflow-hidden' variants={zoomIn}>
                <QuoteComponent />
              </motion.div>

              <div className='flex justify-center '>
                <motion.div className="mb-16 container" variants={slideUp}>
                  <motion.h2
                    className="text-3xl lg:text-4xl font-semibold text-blue-900 text-center my-20"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    Nearly Every Industry is Affected
                  </motion.h2>
                  <motion.div
                    className="grid md:grid-cols-4 gap-5"
                    variants={fadeIn}
                  >
                    {[
                      { title: "Healthcare Workers", icon: Stethoscope, description: "Nurses, medical assistants, and caregivers deserve fair compensation for their dedication." },
                      { title: "Construction Workers", icon: HardHat, description: "Builders, electricians, and plumbers should be paid for every hour they work, including overtime." },
                      { title: "IT Professionals", icon: Laptop, description: "Tech support, developers, and system administrators often work long hours that should be compensated." },
                      { title: "And So Many More...", icon: Star, description: "Retail workers, executive assistant, customer service workers, stock clerks, and more should all be paid fairly for every hour they work" },
                    ].map((category, index) => (
                      <motion.div
                        key={index}
                        className="site-card-bg rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        <category.icon className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                        <p className="text-blue-200">{category.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>


              <div className='flex justify-center'>
                <motion.div className="mb-16 container" variants={slideUp}>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-blue-900 text-center my-20">
                    Why Choose SecureCounsel?

                  </h2>
                  <motion.div
                    className="grid md:grid-cols-2 gap-8"
                    variants={fadeIn}
                  >
                    {[
                      { title: "Expert Legal Team", icon: Briefcase, description: "We selectively partner with employment law attorneys who have a proven track record of success." },
                      { title: "No Upfront Costs", icon: DollarSign, description: "We work on a contingency basis - you only pay if we win your case." },
                      { title: "Personalized Approach", icon: Users, description: "We treat each case with the individual attention it deserves." },
                      { title: "Tech-Driven Approach", icon: Brain, description: "We get you answers faster by using AI to sift through your data & identify case viability." },

                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="site-card-bg rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <feature.icon className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-blue-200">{feature.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              <div className='flex justify-center my-5'>
                <div className="container flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-xl">
                    Don't wait! Statute of limitations may apply. Get your free case review now before it's too late.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
              className="max-w-md mx-auto bg-indigo-700 rounded-lg shadow-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Start Your Free Assessment</h2>
              <motion.div className="space-y-4" variants={slideUp}>
                <div>
                  <Label htmlFor="name" className="text-blue-200">Full Name</Label>
                  <Input id="name" placeholder="John Doe" className="mt-1 bg-indigo-700 text-white placeholder-blue-300" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-blue-200">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="mt-1 bg-indigo-700 text-white placeholder-blue-300" />
                </div>
                <div>
                  <Label className="text-blue-200">Select Your Industry</Label>
                  <RadioGroup value={industry} onValueChange={setIndustry} className="mt-2">
                    {['healthcare', 'construction', 'it', 'other'].map((ind) => (
                      <div key={ind} className="flex items-center space-x-2 p-2 rounded-md hover:bg-indigo-700 transition-colors">
                        <RadioGroupItem value={ind} id={ind} />
                        <Label htmlFor={ind} className="capitalize text-blue-200">{ind}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="text-sm text-blue-200 mt-4 bg-indigo-700 p-4 rounded-md">
                  <p>Your information is 100% confidential and protected.</p>
                  <div className="flex items-center mt-2">
                    <Image src="/security-badge.svg" alt="Security" width={20} height={20} />
                    <span className="ml-2">256-bit SSL Encryption</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105" onClick={handleNextStep}>
                  Get Your Free Case Review
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
              className="max-w-md mx-auto bg-blue-800 rounded-lg shadow-2xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-white mb-4"
                variants={slideUp}
              >
                Thank You for Reaching Out!
              </motion.h2>
              <motion.p
                className="text-blue-200 mb-8 text-lg"
                variants={slideUp}
              >
                One of our legal experts will review your information and contact you within 24 hours to discuss your case.
              </motion.p>
              <motion.div variants={slideUp}>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105" onClick={() => setStep(1)}>
                  Back to Home
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer /> {/* Use the Footer component */}
    </div>
  )
}