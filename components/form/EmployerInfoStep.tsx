'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InfoButton } from "@/components/ui/info-button"

interface EmployerInfoStepProps {
  formData: {
    employerName: string;
    jobTitle: string;
  };
  updateFormData: (newData: Partial<EmployerInfoStepProps['formData']>) => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<EmployerInfoStepProps['formData']>>>;
  setAIContext: React.Dispatch<React.SetStateAction<string>>;
  triggerAIValidation: () => void;
}

export function EmployerInfoStep({ formData, updateFormData, setErrors, setAIContext, triggerAIValidation }: EmployerInfoStepProps) {
  const [localErrors, setLocalErrors] = useState<Partial<EmployerInfoStepProps['formData']>>({});

  const validateStep = (): boolean => {
    const newErrors: Partial<EmployerInfoStepProps['formData']> = {};
    if (!formData.employerName.trim()) newErrors.employerName = 'Employer name is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';

    setLocalErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  useEffect(() => {
    setAIContext(`The user's employer is ${formData.employerName} and their job title is ${formData.jobTitle}.
      Please analyze this information for potential labor law violations or industry-specific concerns.`);
  }, [formData, setAIContext]);

  useEffect(() => {
    if (validateStep()) {
      triggerAIValidation();
    }
  }, [formData]);

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
          onChange={handleInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {localErrors.employerName && <p className="text-red-500 text-sm">{localErrors.employerName}</p>}
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
          onChange={handleInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {localErrors.jobTitle && <p className="text-red-500 text-sm">{localErrors.jobTitle}</p>}
      </div>
    </div>
  )
}
