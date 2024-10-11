'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { toast } from "@/hooks/use-toast"
import { HelpCircle, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormData {
  jobTitle: string
  companyName: string
  weeklyHours: string
  overtimePaid: boolean
  annualIncome: number
  employmentState: string
  roleType: string
  regularBreaks: boolean
  name: string
  email: string
  phone: string
  additionalInfo: string
}

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

export default function UserIntakeForm() {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    companyName: '',
    weeklyHours: '',
    overtimePaid: false,
    annualIncome: 50000,
    employmentState: '',
    roleType: '',
    regularBreaks: false,
    name: '',
    email: '',
    phone: '',
    additionalInfo: ''
  })

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [openState, setOpenState] = useState(false)

  const { messages, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  })

  const handleChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const exportFormData = () => {
    const json = JSON.stringify(formData, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "formData.json"
    link.click()
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (validateForm()) {
      exportFormData()
      toast({
        title: "Form submitted successfully!",
        description: "Your data has been exported as JSON.",
      })
    } else {
      toast({
        title: "Form submission failed",
        description: "Please fill out all required fields correctly.",
        variant: "destructive",
      })
    }
  }

  const validateForm = () => {
    return Object.values(formData).every(value => value !== '' && value !== 0)
  }

  const handleNext = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1)
    } else {
      handleFormSubmit(event)
    }

    await handleSubmit(event)
  }

  function JobDetailsCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">
              Job Title
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 inline-block ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Please provide your official job title. If it looks incorrect or is commonly misclassified as exempt, we may ask for clarification.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="What was your job title?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Company Name
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 inline-block ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This should be the name on your paystub, which may differ from the name your employer goes by. If the name doesn't seem correct, or if it's a known entity, we may ask you to confirm the legal or trade name.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="What is the name of the company you worked for?"
              required
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  function WorkHoursCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Work Hours and Overtime</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>
              Weekly Hours Worked
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 inline-block ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>On average, Americans work 47 hours a week. If over 40, note that this is quite a lot.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex space-x-2">
              <Button
                variant={formData.weeklyHours === '<40' ? 'default' : 'outline'}
                onClick={() => handleChange('weeklyHours', '<40')}
              >
                {'<40 a week'}
              </Button>
              <Button
                variant={formData.weeklyHours === '40' ? 'default' : 'outline'}
                onClick={() => handleChange('weeklyHours', '40')}
              >
                40 a week
              </Button>
              <Button
                variant={formData.weeklyHours === '>40' ? 'default' : 'outline'}
                onClick={() => handleChange('weeklyHours', '>40')}
              >
                {'>40 a week'}
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="overtimePaid"
              checked={formData.overtimePaid}
              onCheckedChange={(checked) => handleChange('overtimePaid', checked)}
            />
            <Label htmlFor="overtimePaid">Did your company pay overtime?</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overtime pay means at least 1.5X your hourly rate.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    )
  }

  function CompensationCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compensation and Employment Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Label htmlFor="annualIncome">
              Annual Income
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 inline-block ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>If under $35,000, you very likely deserve overtime pay. If over $100,000, you may be subject to the high earner's exemption. Otherwise, you're subject to a duties test.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="pt-6 pb-2">
              <Slider
                id="annualIncome"
                min={0}
                max={200000}
                step={1000}
                value={[formData.annualIncome]}
                onValueChange={(value) => handleChange('annualIncome', value[0])}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Annual: ${formData.annualIncome.toLocaleString()}</span>
              <span className="font-medium">Weekly: ${Math.round(formData.annualIncome / 52).toLocaleString()}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="employmentState">
              Employment State
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 inline-block ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Some states like California have stricter labor law protections.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openState}
                  className="w-full justify-between"
                >
                  {formData.employmentState
                    ? states.find((state) => state === formData.employmentState)
                    : "Select state..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandEmpty>No state found.</CommandEmpty>
                  <CommandGroup>
                    {states.map((state) => (
                      <CommandItem
                        key={state}
                        onSelect={() => {
                          handleChange('employmentState', state)
                          setOpenState(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.employmentState === state ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {state}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    )
  }

  function RoleDescriptionCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Role Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="roleType">
              Role Type
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 inline-block ml-2" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Do you mainly follow procedures or handle routine tasks, or do you manage a team, make key decisions, or use expert knowledge regularly?</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="roleType"
              value={formData.roleType}
              onChange={(e) => handleChange('roleType', e.target.value)}
              placeholder="Which best describes your role?"
              required
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  function BreaksCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Breaks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="regularBreaks"
              checked={formData.regularBreaks}
              onCheckedChange={(checked) => handleChange('regularBreaks', checked)}
            />
            <Label htmlFor="regularBreaks">Did you regularly receive your rest and meal breaks?</Label>
          </div>
        </CardContent>
      </Card>
    )
  }

  function ContactInfoCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Please enter your full name (first and last)"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Please enter a valid email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Please enter a valid phone number"
              required
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  function AdditionalInfoCard() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleChange('additionalInfo', e.target.value)}
              placeholder="Thank you! We'll get back to you right away. Leave any additional information you'd like here - we'd love to know anything else you can tell us about your situation!"
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  const cards = [
    JobDetailsCard,
    WorkHoursCard,
    CompensationCard,
    RoleDescriptionCard,
    BreaksCard,
    ContactInfoCard,
    AdditionalInfoCard,
  ]

  const CurrentCard = cards[currentCardIndex]

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>User Intake Form</CardTitle>
          <CardDescription>Please fill out the following information about your employment.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNext} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentCard />
              </motion.div>
            </AnimatePresence>
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {currentCardIndex === cards.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-6 w-full max-w-4xl mx-auto bg-primary/10">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <div className="whitespace-pre-wrap">
            {messages.map(m => (
              <div key={m.id}>{m.content}</div>
            ))}
          </div>
          {isLoading && <span className="animate-pulse">|</span>}
        </CardContent>
      </Card>
    </div>
  )
}