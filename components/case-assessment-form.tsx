'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { MessageSquare, Info, ChevronLeft, ChevronRight } from 'lucide-react'

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

  const { messages, handleInputChange: handleChatInputChange, handleSubmit: handleChatSubmit, isLoading } = useChat({
    api: '/api/chat',
  })

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
      // After collecting employer name and job title
      setProgress(83)
      setStep(step + 1)

      // Prepare the prompt for the LLM
      const prompt = `Provide a brief summary about the employer "${formData.employerName}" in the context of wage and hour disputes or employment practices relevant to "${formData.jobTitle}".`
      // Send the message to the LLM
      // The handleChatSubmit function expects an event object, not a content object
      // We create a synthetic event with preventDefault to satisfy the function's type
      await handleChatSubmit({ preventDefault: () => {}, message: prompt } as any)
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Why is this important?</SheetTitle>
          <SheetDescription>{content}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Your Name
                <InfoButton content="Your name helps us personalize our communication with you and is necessary for any legal proceedings." />
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleFormInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Your Email
                <InfoButton content="We use your email to send important updates about your case and to communicate with you securely." />
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleFormInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Your Phone Number
                <InfoButton content="A phone number allows us to reach you quickly if we need additional information or have important updates about your case." />
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleFormInputChange}
                required
              />
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium leading-none">
                Were you paid overtime for each hour over 40 - that is, at least 1.5x times your hourly wage?
                <InfoButton content="Overtime pay is a crucial aspect of labor law. Most non-exempt employees are entitled to 1.5 times their regular hourly rate for hours worked beyond 40 in a workweek." />
              </Label>
              <RadioGroup value={formData.overtimePaid} onValueChange={(value) => handleRadioChange('overtimePaid', value)} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            {formData.overtimePaid === 'other' && (
              <Textarea
                name="otherOvertimeDetails"
                placeholder="Please provide details about your overtime pay situation..."
                value={formData.otherOvertimeDetails}
                onChange={handleFormInputChange}
                className="min-h-[100px]"
                required
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
                step={50}
                value={[formData.weeklyWage]}
                onValueChange={(value) => handleSliderChange(value)}
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
              <Label htmlFor="employer-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
            <p className="text-md">Based on your input, it appears you may have a valid claim for unpaid wages or overtime.</p>
            <p className="text-sm text-gray-600">We recommend speaking with one of our legal experts to discuss your case in more detail. They will be able to provide personalized advice and guide you through the next steps.</p>
            <Button className="w-full">Schedule a Consultation</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">{progress.toFixed(0)}% Complete</p>
          </div>
          <Card className="backdrop-blur-sm bg-white/90 border-blue-200 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-gray-900">Case Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Message box for streaming LLM output */}
              {messages.length > 0 && (
                <div className="p-4 bg-blue-50 text-blue-900 rounded-md border border-blue-200 shadow-inner mb-6">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Employer Information
                  </h3>
                  {messages.map((message) => (
                    <p key={message.id} className="text-sm leading-relaxed">
                      {message.content}
                    </p>
                  ))}
                  {isLoading && (
                    <div className="mt-2 flex items-center text-sm text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Fetching employer information...
                    </div>
                  )}
                </div>
              )}

              {/* Existing form rendering */}
              {renderForm()}

              <div className="flex justify-between mt-6">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}