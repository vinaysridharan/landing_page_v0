'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, CheckCircle, DollarSign, Users, Brain, Briefcase, HardHat, Laptop, Stethoscope, Gavel, Star } from "lucide-react"
import { CountUp } from './count-up'
import Image from 'next/image'
import { EnhancedHero } from './EnhancedHero'
import { Header } from './Header'
import { CaseAssessmentForm } from './case-assessment-form'
import { Statistics } from './Statistics'
import HeroHeadline from './hero-headline'
import { QuoteComponent } from './quote-component'

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
    <div className="min-h-screen text-black">

      <main className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
            >
              <HeroHeadline />
              <motion.div variants={slideUp} className="flex justify-center">
                <Button size="lg" className="bg-blue-500 mb-10 hover:bg-blue-600 text-white rounded-full text-lg px-8 shadow-lg transform transition-transform duration-200 hover:scale-105" onClick={() => setStep(2)}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <EnhancedHero scrollToForm={() => setStep(2)} />

              {/* </section> */}
              <section className="Statistics">
                <motion.h2
                  className="text-3xl lg:text-4xl font-semibold text-blue-900 text-center mt-20"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  You may be wrongly denied overtime pay...<span className="text-blue-950 font-bold">and not even know it.</span>
                </motion.h2>
                <div className="flex justify-center">
                  <motion.p

                    className="text-xl text-gray-700 text-center my-5"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                  >
                    Worker misclassification is alarmingly common, affecting millions of Americans each year. Many employees are unaware of their rights and the wages they're legally entitled to.
                  </motion.p>
                </div>
                <Statistics />
              </section>

              <motion.div className="mb-16" variants={slideUp}>
                <motion.h2
                  className="text-3xl lg:text-4xl font-semibold text-blue-900 text-center my-20"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  Commonly Misclassified Workers Include:      </motion.h2>
                <motion.div
                  className="grid md:grid-cols-4 gap-5"
                  variants={fadeIn}
                >
                  {[
                    { title: "Healthcare Workers", icon: Stethoscope, description: "Nurses, medical assistants, and caregivers deserve fair compensation for their dedication." },
                    { title: "Construction Workers", icon: HardHat, description: "Builders, electricians, and plumbers should be paid for every hour they work, including overtime." },
                    { title: "IT Professionals", icon: Laptop, description: "Tech support, developers, and system administrators often work long hours that should be compensated." },
                    { title: "And So Many More...", icon: Star, description: "Retail workers, executive assistant,customer service workers, stock clerks, and more should all be paid fairly for every hour they work" },
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      className="bg-indigo-700 rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
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
              <motion.div variants={zoomIn}>
                <QuoteComponent />
              </motion.div>

              <motion.div className="mb-16" variants={slideUp}>
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
                      className="bg-indigo-700 rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
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

              <motion.div variants={slideUp} className="bg-red-800 border-l-4 border-red-500 p-6 mb-16 rounded-r-lg shadow-md">
                <p className="text-red-200 font-semibold text-lg">Don't wait! Statute of limitations may apply. Get your free case review now before it's too late.</p>
              </motion.div>
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

      <CaseAssessmentForm />

      <motion.footer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-blue-800 text-white py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SecureCounsel. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-300 transition-colors">Contact Us</a>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}