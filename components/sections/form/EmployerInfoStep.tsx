'use client'

import React from 'react'
import { Field, FormikProps } from 'formik'
import { Label } from "@/components/ui/label"
import InfoButton from '@/components/ui/infoButton'
import { FormData } from './utils';

interface EmployerInfoStepProps {
  formik: FormikProps<FormData>;
}

export function EmployerInfoStep({ formik }: EmployerInfoStepProps) {
  const { errors, touched} = formik;

  // React.useEffect(() => {
  //   setAIContext(`The user's employer is ${values.employerName} and their job title is ${values.jobTitle}.
  //     Please analyze this information for potential labor law violations or industry-specific concerns.`);
  // }, [values, setAIContext]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label 
          htmlFor="employerName" 
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Employer Name
          <InfoButton content="Knowing your employer helps us research their history of labor practices and any previous wage disputes." />
        </Label>
        <Field
          id="employerName"
          name="employerName"
          placeholder="Enter your employer's name"
          className={`text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] w-full ${
            touched.employerName && errors.employerName ? 'border-red-500' : ''
          }`}
        />
        {touched.employerName && errors.employerName && (
          <p className="text-red-500 text-sm">{errors.employerName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label 
          htmlFor="jobTitle" 
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Job Title
          <InfoButton content="Your job title can help determine if you were correctly classified as exempt or non-exempt from overtime pay." />
        </Label>
        <Field
          id="jobTitle"
          name="jobTitle"
          placeholder="Enter your job title"
          className={`text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] w-full ${
            touched.jobTitle && errors.jobTitle ? 'border-red-500' : ''
          }`}
        />
        {touched.jobTitle && errors.jobTitle && (
          <p className="text-red-500 text-sm">{errors.jobTitle}</p>
        )}
      </div>
    </div>
  )
}