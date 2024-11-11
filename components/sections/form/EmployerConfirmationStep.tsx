'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { FormikProps } from 'formik';
import { FormData } from './utils';

interface EmployerConfirmationStepProps {
  formik: FormikProps<FormData>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function EmployerConfirmationStep({ formik, setStep }: EmployerConfirmationStepProps) {
  const { values, handleSubmit } = formik;

  // React.useEffect(() => {
  //   setAIContext(`Confirming employer information:
  //     Employer: ${values.employerName}
  //     Job Title: ${values.jobTitle}
      
  //     Please review and confirm this information.`);
  // }, [values, setAIContext]);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">Employer: {values.employerName}</p>
      <p className="text-md">Job Title: {values.jobTitle}</p>
      <p className="text-sm text-gray-600">Please confirm if this is the correct employer on your paycheck.</p>
      <div className="flex space-x-4">
        <Button 
          onClick={() => handleSubmit()} 
          type="button"
          className="flex-1"
        >
          Yes, that&apos;s correct
        </Button>
        <Button 
          onClick={() => setStep(3)} 
          type="button"
          variant="outline" 
          className="flex-1"
        >
          No, I need to edit
        </Button>
      </div>
    </div>
  )
}