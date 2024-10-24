/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

export function AIAssessment() {
  const [situation, setSituation] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [showWageInput, setShowWageInput] = useState(false)
  const [showEmployerInput, setShowEmployerInput] = useState(false)
  const [showEmployerResults, setShowEmployerResults] = useState(false)
  const [weeklyWage, setWeeklyWage] = useState(500)
  const [employerName, setEmployerName] = useState('')
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowWageInput(true)
    setProgress(25)
  }

  const handleWageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowWageInput(false)
    setShowEmployerInput(true)
    setProgress(50)
  }

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowEmployerInput(false)
    setShowEmployerResults(true)
    setProgress(75)
  }

  const handleEmployerConfirm = () => {
    setShowEmployerResults(false)
    setAiResponse(`Based on your input, weekly wage of $${weeklyWage}, and employer "${employerName}", it appears you may have a valid claim for unpaid overtime. We recommend speaking with one of our legal experts to discuss your case in more detail.`)
    setProgress(100)
  }

  const simulatedGoogleResults = [
    { title: `${employerName} - Official Website`, url: `https://www.${employerName.toLowerCase().replace(/\s+/g, '')}.com` },
    { title: `${employerName} Reviews | Glassdoor`, url: `https://www.glassdoor.com/Reviews/${employerName.replace(/\s+/g, '-')}-Reviews-E12345.htm` },
    { title: `${employerName} | LinkedIn`, url: `https://www.linkedin.com/company/${employerName.toLowerCase().replace(/\s+/g, '')}` },
  ]

  return (
    <Card className="max-w-2xl mx-auto backdrop-blur-sm bg-white/90 border-blue-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-gray-900">AI-Powered Case Assessment</CardTitle>
        <CardDescription>Tell us about your wage and hour issues, and our AI will provide an initial assessment.</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="w-full mb-4 h-2 bg-blue-100" />
        {!showWageInput && !showEmployerInput && !showEmployerResults ?
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Describe your situation here..."
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="min-h-[100px] border-blue-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <Button type="submit" variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">Submit</Button>
          </form>
          : null}
      </CardContent>
    </Card>
  )
}