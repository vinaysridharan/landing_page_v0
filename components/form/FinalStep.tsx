import React from 'react'
import { Button } from "@/components/ui/button"

export function FinalStep() {
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
}
