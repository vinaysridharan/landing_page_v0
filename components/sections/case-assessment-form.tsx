/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Info, ChevronLeft, ChevronRight, Bot, ShieldCheck, X } from 'lucide-react'

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
}

export function CaseAssessmentForm() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [employerConfirmed, setEmployerConfirmed] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [showAIResponse, setShowAIResponse] = useState(false)
  const [stableAIContent, setStableAIContent] = useState('')
  const lastMessageRef = useRef('')

  const { isLoading, messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    setProgress(((step + 1) / 7) * 100)
  }, [step])

  useEffect(() => {
    console.log("use effect for maeesages")
    if (messages.length > 0) {
      if (showAIResponse === false) {
        setShowAIResponse(true)
    console.log("use effect for maeesages making is on ")
      }
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant' && lastMessage.content !== lastMessageRef.current) {
        lastMessageRef.current = lastMessage.content
        setStableAIContent(lastMessage.content)
      }
    }
  }, [messages])

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    handleInputChange(e as React.ChangeEvent<HTMLInputElement>)
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

  interface SubmitEvent {
    preventDefault: () => void;
    message: string;
  }

  const handleNext = async () => {
    if (!validateStep()) return

    if (step === 4) {
      setProgress(80)
      setStep(step + 1)

      const prompt = `Provide a brief summary about the employer "${formData.employerName}" in the context of wage and hour disputes or employment practices relevant to "${formData.jobTitle}".`

      await handleSubmit({ preventDefault: () => { }, message: prompt } as SubmitEvent)
    } else {
      setStep(prev => prev + 1)
      handleSubmit({ preventDefault: () => { }, message: '' } as SubmitEvent)
    }
  }

  const handlePrevious = () => {
    setStep(prev => prev - 1)
  }

  const AIThinkingBalloon = () => (
    <AnimatePresence>
      {showAIResponse && (
        <div
          // initial={{ opacity: 0, y: -50 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: -50 }}
          // transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-4 shadow-lg z-50"
        >
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => setShowAIResponse(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-start space-x-2">
            <Bot className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold text-blue-700">AI Assistant</p>
              <p className="text-sm text-blue-800">
                {stableAIContent}
              </p>
            </div>
          </div>
          {isLoading && (
            <div className="flex items-center text-sm text-blue-600 mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Analyzing your case...
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  )

  interface InfoButtonProps {
    content: ReactNode; // Change from string to ReactNode
  }

  const InfoButton: React.FC<InfoButtonProps> = ({ content }: { content: string }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Info className="h-4 w-4" />
          <span className="sr-only">Why is this important?</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-gray-900">Why is this important?</SheetTitle>
          <SheetDescription className="mt-2 text-sm text-gray-700">
            {content}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <Label htmlFor="contact-info" className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Contact Information
              <InfoButton content="Your contact information helps us personalize our communication with you and is necessary for any legal proceedings." />
            </Label>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormInputChange}
                required
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Your Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleFormInputChange}
                required
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Your Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleFormInputChange}
                required
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-slate-500" />
              <Label htmlFor="data-protection-info" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                We take your privacy and data security very seriously
              </Label>
              <InfoButton content={
                <>
                  <p className="text-sm text-gray-600">
                    <strong>Data Protection:</strong> All the information you provide is encrypted both in transit and at rest using industry-standard encryption protocols.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Encryption Details:</strong> We use TLS for data transmission and AES-256 for data storage.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Data Usage:</strong> Your information is used solely for case assessment and communication purposes.
                  </p>
                </>
              } />
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium leading-none">
                Were you paid overtime for each hour over 40 - that is, at least 1.5x times your hourly wage?
                <InfoButton content="Overtime pay is a crucial aspect of labor law. Most non-exempt employees are entitled to 1.5 times their regular hourly rate for hours worked beyond 40 in a workweek." />
              </Label>
              <RadioGroup value={formData.overtimePaid} onValueChange={(value) => handleRadioChange('overtimePaid', value)} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label className='text-base' htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label className='text-base' htmlFor="no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label className='text-base' htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
              {errors.overtimePaid && <p className="text-red-500 text-sm">{errors.overtimePaid}</p>}
            </div>
            {formData.overtimePaid === 'other' && (
              <div className="space-y-2">
                <Textarea
                  name="otherOvertimeDetails"
                  placeholder="Please provide details about your overtime pay situation..."
                  value={formData.otherOvertimeDetails}
                  onChange={handleFormInputChange}
                  required
                  className='text-base min-h-[100px] border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
                />
                {errors.otherOvertimeDetails && <p className="text-red-500 text-sm">{errors.otherOvertimeDetails}</p>}
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weekly-wage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Weekly Wage: ${formData.weeklyWage}
                <InfoButton content="Your wage information is crucial for calculating potential unpaid wages or overtime. It helps us determine if you were paid fairly according to labor laws." />
              </Label>
              <Slider
                id="weekly-wage"
                name="weeklyWage"
                min={0}
                max={3000}
                step={10}
                value={[formData.weeklyWage]}
                onValueChange={handleSliderChange}
                className="w-full"
              />
            </div>
            <p className="text-sm font-medium text-blue-600">
              Implied Annual Wage: ${(formData.weeklyWage * 52).toLocaleString()}
            </p>
            {formData.weeklyWage >= 3000 && (
              <p className="text-sm text-yellow-800 bg-yellow-100 p-2 rounded-md mt-2">
                You are likely a highly compensated employee & thus, exempt from many labor protections. Let's continue anyway.
              </p>
            )}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employer-name" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Employer Name
                <InfoButton content="Knowing your employer helps us research their history of labor practices and any previous wage disputes." />
              </Label>
              <Input
                id="employer-name"
                name="employerName"
                placeholder="Enter your employer's name"
                value={formData.employerName}
                onChange={handleFormInputChange}
                required
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
              />
              {errors.employerName && <p className="text-red-500 text-sm">{errors.employerName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Job Title
                <InfoButton content="Your job title can help determine if you were correctly classified as exempt or non-exempt from overtime pay." />
              </Label>
              <Input
                id="job-title"
                name="jobTitle"
                placeholder="Enter your job title"
                value={formData.jobTitle}
                onChange={handleFormInputChange}
                required
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
              />
              {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">Employer: {formData.employerName}</p>
            <p className="text-md">Job Title: {formData.jobTitle}</p>
            <p className="text-sm text-gray-600">Please confirm if this is the correct employer on your paycheck.</p>
            <div className="flex space-x-4">
              <Button onClick={() => {
                setEmployerConfirmed(true)
                handleNext()
              }} className="flex-1">
                Yes, that's correct
              </Button>
              <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                No, I need to edit
              </Button>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hours-worked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                How many hours a week would you say you worked on average?
                <InfoButton content="The number of hours you worked is crucial in determining if you're entitled to overtime pay. Overtime regulations typically apply to hours worked over 40 per week." />
              </Label>
              <Slider
                id="hours-worked"
                name="hoursWorked"
                min={1}
                max={80}
                step={1}
                value={[formData.hoursWorked]}
                onValueChange={handleSliderChange}
                className={`w-full ${formData.hoursWorked < 40 ? 'bg-red-200' : formData.hoursWorked > 40 ? 'bg-blue-200' : 'bg-gray-200'}`}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1</span>
                <span>40</span>
                <span>80+</span>
              </div>
              <p className="text-sm mt-2 font-medium" style={{ color: formData.hoursWorked < 40 ? '#7f1d1d' : formData.hoursWorked > 40 ? '#1e40af' : '#374151' }}>
                {formData.hoursWorked === 80 ? "80 or more hours per week" : `${formData.hoursWorked} hours per week`}
              </p>
              {formData.hoursWorked < 40 ? (
                <p className="text-sm text-red-800 bg-red-100 p-2 rounded-md mt-2">
                  While you may not have worked overtime, let's see if you are potentially owed compensation for other violations like meal & rest breaks.
                </p>
              ) : formData.hoursWorked > 40 ? (
                <p className="text-sm text-blue-800 bg-blue-100 p-2 rounded-md mt-2">
                  You may be eligible for overtime pay as well as compensation for any other violations.
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium leading-none">
                Which best describes your role?
                <InfoButton content="Your role in the company can affect your classification as exempt or non-exempt from certain labor protections." />
              </Label>
              <RadioGroup value={formData.role} onValueChange={(value) => handleRadioChange('role', value)} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="routine" id="routine" />
                  <Label htmlFor="routine">Do you mainly follow procedures or handle routine tasks?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="management" id="management" />
                  <Label htmlFor="management">Do you manage a team, make key decisions, or use expert knowledge regularly?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other-role" />
                  <Label htmlFor="other-role">Other (I don't think either of these fit)</Label>
                </div>
              </RadioGroup>
              {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            </div>
            {formData.role === 'other' && (
              <div className="space-y-2">
                <Textarea
                  name="otherRoleDetails"
                  placeholder="Please describe your role..."
                  value={formData.otherRoleDetails}
                  onChange={handleFormInputChange}
                  className="min-h-[100px]"
                  required
                />
                {errors.otherRoleDetails && <p className="text-red-500 text-sm">{errors.otherRoleDetails}</p>}
              </div>
            )}
          </div>
        )
      case 6:
        return (
          <div className="space-y-4">
            <p className="text-lg font-medium">Thank you for providing all the necessary information.</p>
            <p className="text-md">Based on your input, we'll need to do a review of the AI responses. Thank you for your patience as we continue alpha testing!</p>
            <p className="text-sm text-gray-600">We recommend speaking with one of us to discuss your case in more detail. We can then provide personalized advice and guide you through the next steps.</p>
            <Button className="w-full" onClick={() => {
              window.location.href = 'https://calendly.com/vsridharan-parabellumcap/30min';
            }}>Schedule a Consultation</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="mx-10 h-[600px] flex flex-col items-center bg-blue-200 rounded-[40px] relative">
      <AIThinkingBalloon />
      <main className="flex-grow container mx-auto px-8 py-8">
        <div className="mx-auto">
          <Card className="flex flex-col justify-between rounded-[30px] backdrop-blur-sm bg-white/90 border-blue-200 shadow-xl h-[540px]">
            <div>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-800">
                  <span className="text-slate-500">AI-Powered</span> Instant Case Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderForm()}
                </motion.div>
              </CardContent>
            </div>
            <CardFooter className="flex justify-between">
              <Button
                onClick={handlePrevious}
                disabled={step === 0 || isLoading}
                variant="outline"
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={step === 6 || isLoading}
                className="flex items-center"
              >
                {isLoading ? (
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
      </main>
    </div>
  )
}