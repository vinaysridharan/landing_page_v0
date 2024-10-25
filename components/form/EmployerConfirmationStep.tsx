import React from 'react'
import { Button } from "@/components/ui/button"

interface EmployerConfirmationStepProps {
  formData: {
    employerName: string;
    jobTitle: string;
  };
  handleNext: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function EmployerConfirmationStep({ formData, handleNext, setStep }: EmployerConfirmationStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">Employer: {formData.employerName}</p>
      <p className="text-md">Job Title: {formData.jobTitle}</p>
      <p className="text-sm text-gray-600">Please confirm if this is the correct employer on your paycheck.</p>
      <div className="flex space-x-4">
        <Button onClick={handleNext} className="flex-1">
          Yes, that's correct
        </Button>
        <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
          No, I need to edit
        </Button>
      </div>
    </div>
  )
}
