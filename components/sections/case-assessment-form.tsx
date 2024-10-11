'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageSquare, Info, ChevronLeft, ChevronRight, Scale, Bot, ShieldCheck } from 'lucide-react' // Importing ShieldCheck icon for security or compliance

interface FormData {
  name: string,
  email: string,
  phone: string,
  hoursWorked: number,
  overtimePaid: string,
  otherOvertimeDetails: string,
  weeklyWage: number,
  employerName: string,
  jobTitle: string,
  role: string,
  state: string,
  otherStateDetails: string,
  breaksReceived: string,
  otherRoleDetails: string,
}

export function CaseAssessmentForm() {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState<FormData>({
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
    state: '',
    otherStateDetails: '',
    breaksReceived: '',
    otherRoleDetails: '',
  })
  const [employerConfirmed, setEmployerConfirmed] = useState(false)

  const { isLoading, messages, input, handleInputChange, handleSubmit } = useChat();

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, hoursWorked: value[0] }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    if (step === 4) {
      setProgress(80)
      setStep(step + 1)

      const prompt = `Provide a brief summary about the employer "${formData.employerName}" in the context of wage and hour disputes or employment practices relevant to "${formData.jobTitle}".`
      await handleSubmit({ preventDefault: () => { }, message: prompt } as any)
    } else {
      const nextStep = step + 1
      setStep(nextStep)
      setProgress(((nextStep + 1) / 7) * 100)
    }
  }

  const handlePrevious = () => {
    const prevStep = step - 1
    setStep(prevStep)
    setProgress(((prevStep + 1) / 7) * 100)
  }

  const InfoButton = ({ content }: { content: string }) => (
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
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] '
              />
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
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] '
              />
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
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] '
              />
            </div>
            {/* ShieldCheck icon to indicate data protection */}
            {/* Info icon for Data Treatment and Encryption */}
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-8 w-8 text-slate-500" /> 
              <Label htmlFor="data-protection-info" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                We take your privacy and data security very seriously
              </Label>
              <InfoButton content={
                <>
                  <p className="text-sm text-gray-600">
                    <strong>Data Protection:</strong>All the information you provide is encrypted both in transit and at rest using industry-standard encryption protocols. This ensures that your personal data, including your name, email, and phone number, is protected from unauthorized access.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Encryption Details:</strong> We use TLS (Transport Layer Security) to encrypt data transmitted between your browser and our servers. Additionally, your data is stored in an encrypted format using AES-256 (Advanced Encryption Standard) on our servers. This dual-layer encryption approach helps safeguard your information throughout the entire process.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Data Usage:</strong> The contact information you provide is used solely for the purpose of personalizing our communication with you and for any necessary legal proceedings. We do not share your personal information with third parties without your explicit consent.
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
            </div>
            {formData.overtimePaid === 'other' && (
              <Textarea
                name="otherOvertimeDetails"
                placeholder="Please provide details about your overtime pay situation..."
                value={formData.otherOvertimeDetails}
                onChange={handleFormInputChange}
                required
                className='text-base min-h-[100px] border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] '
              />
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
                step={10} // Reduced step value to make the slider easier to move
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
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] '
              />
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
                className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] '
              />
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
            </div>
            {formData.role === 'other' && (
              <Textarea
                name="otherRoleDetails"
                placeholder="Please describe your role..."
                value={formData.otherRoleDetails}
                onChange={handleFormInputChange}
                className="min-h-[100px]"
                required
              />
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
    <div className="mx-10 flex flex-col items-center bg-gradient-to-b from-blue-200 to-transparent to-transparent rounded-[40px]">
      {/* <header className="w-full bg-blue-600 text-white py-6 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold flex items-center justify-center">
            <Scale className="mr-2 h-8 w-8" />
            Instant AI-Powered Case Assessment
          </h1>
        </div>
      </header> */}
      <main className="flex-grow container mx-auto px-8 py-8">
        <div className="mx-auto">
          {/* <div className="mb-8">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2 text-center">{progress.toFixed(0)}% Complete</p>
          </div> */}
          <Card className="flex flex-col justify-between rounded-[30px] backdrop-blur-sm bg-white/90 border-blue-200 shadow-xl h-[600px]">
            <div>
              <CardHeader>
                <Bot className="h-8 w-8 text-slate-500" />
                <CardTitle className="text-2xl text-blue-800"><span className="text-slate-500">AI-Powered</span> Instant Case Assessment</CardTitle>
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

          {/* AI Response Message Box */}
          {messages.length > 0 && (
            <Card className="bg-blue-50 border-blue-200 shadow-lg mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-blue-800 flex items-center">
                  <Bot className="mr-2 h-6 w-6" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {messages.map((message, index) => (
                  <p key={index} className="text-sm leading-relaxed mb-2">
                    {message.content}
                  </p>
                ))}
                {isLoading && (
                  <div className="flex items-center text-sm text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Analyzing your case...
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}