"use client";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, CheckCircle, DollarSign, Users, Briefcase, HardHat, Laptop, Stethoscope, Gavel, Star } from "lucide-react"
import { CountUp } from './count-up';
import Image from 'next/image';
import { VideoHero } from './VideoHero';    
import { EnhancedHero } from './EnhancedHero';
import { Header } from './Header';
import { CaseAssessmentForm } from './case-assessment-form';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-6 flex justify-between items-center"
      >
        <div className="flex items-center space-x-2">
          <Gavel className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-900">SecureCounsel</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#how-it-works" className="text-blue-900 hover:text-blue-700 transition-colors">How It Works</a>
          <a href="#success-stories" className="text-blue-900 hover:text-blue-700 transition-colors">Success Stories</a>
          <a href="#about-us" className="text-blue-900 hover:text-blue-700 transition-colors">About Us</a>
          <a href="#contact" className="text-blue-900 hover:text-blue-700 transition-colors">Contact</a>
        </nav>
      </motion.header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
            >
              {/* Enhanced Hero Section */}
              {/* Example of old hero: */}
              {/* <VideoHero videoSrc="/worker_video_2.mp4" /> */}
              <EnhancedHero 
                scrollToForm={() => setStep(2)}
              />

              <motion.p
                className="text-xl md:text-2xl text-blue-700 mb-8"
                variants={slideUp}
              >
                We've helped workers like you recover <span className="font-bold">over $100 million</span> in unpaid wages. It's time to get what you deserve.
              </motion.p>
              <motion.div variants={slideUp}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg px-8 py-4" onClick={() => setStep(2)}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div variants={slideUp} className="mt-8 flex justify-center md:justify-start space-x-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Star key={index} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </motion.div>
              <motion.p variants={slideUp} className="text-gray-600 mt-2">
                Rated 4.9/5 by over 1,000 satisfied clients
              </motion.p>

              {/* Social Proof Section */}
              <motion.div variants={slideUp} className="mb-16 text-center">
                <p className="text-gray-600 mb-4">Trusted by workers from:</p>
                <div className="flex justify-center space-x-8">
                  {['amazon.svg', 'walmart.svg', 'target.svg', 'mcdonalds.svg'].map((logo, index) => (
                    <Image key={index} src={`/logos/${logo}`} alt="Company logo" width={100} height={40} />
                  ))}
                </div>
              </motion.div>

              {/* Statistics Section */}
              <motion.div className="mb-16" variants={slideUp}>
                <motion.div 
                  className="grid md:grid-cols-2 gap-8 mb-12"
                  variants={fadeIn}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-8 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <CountUp target={60} duration={1000} colorScheme="blue" />
                    </div>
                    <p className="text-lg text-blue-700">of people are eligible for overtime pay</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white rounded-lg shadow-lg p-8 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <CountUp target={30} duration={1700} colorScheme="red" />
                    </div>
                    <p className="text-lg text-red-700">of employers <span className="font-bold">do not pay</span> what is owed</p>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Worker Categories Section */}
              <motion.div className="mb-16" variants={slideUp}>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
                  Industries We Serve
                </h2>
                <motion.div 
                  className="grid md:grid-cols-3 gap-8"
                  variants={fadeIn}
                >
                  {[
                    { title: "Healthcare Workers", icon: Stethoscope, description: "Nurses, medical assistants, and caregivers deserve fair compensation for their dedication." },
                    { title: "Construction Workers", icon: HardHat, description: "Builders, electricians, and plumbers should be paid for every hour they work, including overtime." },
                    { title: "IT Professionals", icon: Laptop, description: "Tech support, developers, and system administrators often work long hours that should be compensated." },
                  ].map((category, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white rounded-lg shadow-lg p-8 text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <category.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">{category.title}</h3>
                      <p className="text-blue-700">{category.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Why Choose Us Section */}
              <motion.div className="mb-16" variants={slideUp}>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
                  Why Choose SecureCounsel?
                </h2>
                <motion.div 
                  className="grid md:grid-cols-3 gap-8"
                  variants={fadeIn}
                >
                  {[
                    { title: "Expert Legal Team", icon: Briefcase, description: "Our attorneys specialize in employment law and have a proven track record of success." },
                    { title: "No Upfront Costs", icon: DollarSign, description: "We work on a contingency basis - you only pay if we win your case." },
                    { title: "Personalized Approach", icon: Users, description: "We treat each case with the individual attention it deserves." },
                  ].map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white rounded-lg shadow-lg p-8 text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
                      <p className="text-blue-700">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Urgency Section */}
              <motion.div variants={slideUp} className="bg-red-100 border-l-4 border-red-500 p-4 mb-16">
                <p className="text-red-700 font-semibold">Don't wait! Statute of limitations may apply. Get your free case review now before it's too late.</p>
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
              className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Start Your Free Assessment</h2>
              <motion.div className="space-y-4" variants={slideUp}>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label>Select Your Industry</Label>
                  <RadioGroup value={industry} onValueChange={setIndustry}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="healthcare" id="healthcare" />
                      <Label htmlFor="healthcare">Healthcare</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="construction" id="construction" />
                      <Label htmlFor="construction">Construction</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="it" id="it" />
                      <Label htmlFor="it">IT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="text-sm text-gray-600 mt-4">
                  <p>Your information is 100% confidential and protected.</p>
                  <div className="flex items-center mt-2">
                    <Image src="/security-badge.svg" alt="Security" width={20} height={20} />
                    <span className="ml-2">256-bit SSL Encryption</span>
                  </div>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleNextStep}>
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
              className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-blue-900 mb-4"
                variants={slideUp}
              >
                Thank You for Reaching Out!
              </motion.h2>
              <motion.p 
                className="text-blue-700 mb-6"
                variants={slideUp}
              >
                One of our legal experts will review your information and contact you within 24 hours to discuss your case.
              </motion.p>
              <motion.div variants={slideUp}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setStep(1)}>
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
        className="bg-blue-900 text-white py-12"
      >
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 SecureCounsel. All rights reserved.</p>
        </div>
      </motion.footer>

    </div>
  )
}