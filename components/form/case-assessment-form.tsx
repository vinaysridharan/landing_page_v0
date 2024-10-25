/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

//@MUNEEB - SEE NOTES HERE OF ISSUES
// IT IS SKIPPING AHEAD BY 2 WITH THE AI VALIDATION
// THE GENERAL VALIDATION SHOULD SOMEHOW BE BUILT INTO EACH COMPONENT. LIKE ENSURING EMAIL IS OF A CERTAIN FORM, ETC. 
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { ContactFormStep } from '@/components/form/ContactFormStep'
import { PaidOvertimeStep } from '@/components/form/PaidOvertimeStep'
import { WeeklyWageStep } from '@/components/form/WeeklyWageStep'
import { EmployerInfoStep } from '@/components/form/EmployerInfoStep'
import { EmployerConfirmationStep } from '@/components/form/EmployerConfirmationStep'
import { WorkHoursStep } from '@/components/form/WorkHoursStep'
import { FinalStep } from '@/components/form/FinalStep'
import AIBot from '@/components/form/ai-bot'
import { useSearchParams } from 'next/navigation'

const FINAL_STEP = 6; //Set this to indicate the last step of the form

interface FormData {
  name: string;
  email: string;
  phone: string;
  hoursWorked: number;
  overtimePaid: string;
  otherOvertimeDetails: string;
  weeklyWage: number;
  employerName: string;
  jobTitle: string;
  role: string;
  otherRoleDetails: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  hoursWorked: 40,
  overtimePaid: '',
  otherOvertimeDetails: '',
  weeklyWage: 500,
  employerName: '',
  jobTitle: '',
  role: '',
  otherRoleDetails: '',
};

export function CaseAssessmentForm() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [showAIBot, setShowAIBot] = useState(false)
  const [aiContext, setAIContext] = useState('')
  const [canProceed, setCanProceed] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [shouldTriggerAI, setShouldTriggerAI] = useState(false);
  const searchParams = useSearchParams()
  const [isSettingContext, setIsSettingContext] = useState(false);

  useEffect(() => {
    setProgress(((step + 1) / 7) * 100)
  }, [step])

  useEffect(() => {
    const shouldExpand = searchParams.get('expand') === 'true'
    if (shouldExpand) {
      handleExpand();
    }
  }, [searchParams])


  useEffect(() => {
    if (shouldTriggerAI && aiContext.trim() !== '') {
      setShowAIBot(true);
      setCanProceed(false);
      setShouldTriggerAI(false); // Reset the trigger
      console.log("AI should be triggered with context:", aiContext);
    }
  }, [shouldTriggerAI, aiContext]);

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, [step === 2 ? 'weeklyWage' : 'hoursWorked']: value[0] }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {}
    let isValid = true

    switch (step) {
      case 0:
        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number'
        break
      case 1:
        if (!formData.overtimePaid) newErrors.overtimePaid = 'Please select an option'
        if (formData.overtimePaid === 'other' && !formData.otherOvertimeDetails.trim()) {
          newErrors.otherOvertimeDetails = 'Please provide details'
        }
        break
      case 3:
        if (!formData.employerName.trim()) newErrors.employerName = 'Employer name is required'
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required'
        break
      case 5:
        if (!formData.role) newErrors.role = 'Please select a role'
        if (formData.role === 'other' && !formData.otherRoleDetails.trim()) {
          newErrors.otherRoleDetails = 'Please provide details'
        }
        break
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      isValid = false
    }

    return isValid
  }

  const handleExpand = () => {
    setIsExpanded(true);
    // Scroll to top after a short delay to allow for expansion animation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  const handleCollapse = () => {
    setIsExpanded(false);
    setStep(0);
  }

  const handleNext = async () => {
    if (!validateStep()) return

    setIsSettingContext(true);
    let newContext = '';

    // Set AI context based on current step
    switch (step) {
      case 0:
        handleExpand();
        newContext = `Please sense-check the following contact information:
          Name: ${formData.name}
          Email: ${formData.email} 
          Phone: ${formData.phone}
          
          Just make sure if this information appears logical and valid. 
          If so, just say "Great!" & assure them you'll get them the support they need. 
          If there are instead obvious issues, like a "555" number, flag them for the user and ask them to correct it before moving forward.`;
        break;
      case 1:
        newContext = 'whatsup';
        break;
      // ... set context for other steps
    }
    setShowAIBot(true);
    setAIContext(newContext);
    setIsSettingContext(false);
    setShouldTriggerAI(true); // Set the trigger to true
  }

  const handlePrevious = () => {
    if (step === 1) {
      handleCollapse();
    } else {
      setStep(prev => prev - 1);
    }
  }

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <ContactFormStep 
            formData={formData}
            errors={errors}
            handleFormInputChange={handleFormInputChange}
          />
        )
      case 1:
        return (
          <PaidOvertimeStep 
            formData={formData}
            errors={errors}
            handleRadioChange={handleRadioChange}
            handleFormInputChange={handleFormInputChange}
          />
        )
      case 2:
        return (
          <WeeklyWageStep
            formData={formData}
            handleSliderChange={handleSliderChange}
          />
        )
      case 3:
        return (
          <EmployerInfoStep
            formData={formData}
            errors={errors}
            handleFormInputChange={handleFormInputChange}
          />
        )
      case 4:
        return (
          <EmployerConfirmationStep
            formData={formData}
            handleNext={handleNext}
            setStep={setStep}
          />
        )
      case 5:
        return (
          <WorkHoursStep
            formData={formData}
            errors={errors}
            handleSliderChange={handleSliderChange}
            handleRadioChange={handleRadioChange}
            handleFormInputChange={handleFormInputChange}
          />
        )
      case 6:
        return (
          <FinalStep />
        )
      default:
        return null
    }
  }

  const handleAIResponse = (newCanProceed: boolean) => {
    // Log the AI's decision for debugging purposes
    console.log("AI decision for canProceed:", newCanProceed);

    // Only update state if the new value is different from current state
    if (newCanProceed !== canProceed) {
      setCanProceed(newCanProceed);
      
      // If AI says we can proceed, move to next step
      if (newCanProceed) {
        setStep(prevStep => prevStep + 1);
      }
    }
  }

  return (
    <motion.div 
      className="mx-auto relative overflow-hidden"
      initial={false}
      animate={{
        height: isExpanded ? '100vh' : '600px',
        width: isExpanded ? '100vw' : 'auto',
        position: isExpanded ? 'fixed' : 'relative',
        top: isExpanded ? 0 : 'auto',
        left: isExpanded ? 0 : 'auto',
        right: isExpanded ? 0 : 'auto',
        bottom: isExpanded ? 0 : 'auto',
        zIndex: isExpanded ? 50 : 'auto',
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-blue-200"
        initial={false}
        animate={{
          borderRadius: isExpanded ? '0px' : '40px',
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      {isExpanded && (
        <Button
          className="absolute top-4 right-4 z-50"
          variant="ghost"
          size="icon"
          onClick={handleCollapse}
        >
          <X className="h-6 w-6" />
        </Button>
      )}

      <motion.main 
        className={`flex-grow container mx-auto px-8 py-8 ${isExpanded ? 'max-w-2xl' : ''}`}
        initial={false}
        animate={{
          scale: isExpanded ? 1 : 0.95,
          opacity: isExpanded ? 1 : 0.8,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="mx-auto">
          {showAIBot && (
            <AIBot 
              context={aiContext} 
              canProceed={canProceed}
              setCanProceed={handleAIResponse}
              shouldTriggerAI={shouldTriggerAI}
              setShouldTriggerAI={setShouldTriggerAI}
            />
          )}
          <Card className={`flex flex-col justify-between rounded-[30px] bg-white/90 border-blue-200 shadow-xl ${isExpanded ? 'min-h-[calc(100vh-4rem)]' : 'h-[540px]'}`}>
            <div>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">
                  <span className="text-slate-500">AI-Powered</span> Instant Case Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderForm()}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </div>
            <CardFooter className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={step === 0 || !canProceed}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={step >= FINAL_STEP || !canProceed}
                className="flex items-center"
              >
                {!canProceed ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.main>
    </motion.div>
  )
}
