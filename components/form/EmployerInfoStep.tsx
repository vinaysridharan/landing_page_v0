import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoButton } from "@/components/ui/info-button"

interface EmployerInfoStepProps {
  formData: {
    employerName: string;
    jobTitle: string;
  };
  errors: {
    employerName?: string;
    jobTitle?: string;
  };
  handleFormInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EmployerInfoStep({ formData, errors, handleFormInputChange }: EmployerInfoStepProps) {
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
}
