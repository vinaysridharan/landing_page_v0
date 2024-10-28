// WeeklyWageStep component handles collecting and displaying weekly wage information
// Uses a slider input with min/max bounds and calculates implied annual salary
// Shows warning for highly compensated employees who may be exempt from protections
'use client'

import React, { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { InfoButton } from "@/components/ui/info-button"

interface WeeklyWageStepProps {
  formData: {
    weeklyWage: number;
  };
  updateFormData: (newData: Partial<WeeklyWageStepProps['formData']>) => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<WeeklyWageStepProps['formData']>>>;
  setAIContext: React.Dispatch<React.SetStateAction<string>>;
  triggerAIValidation: () => void;
}

export function WeeklyWageStep({ formData, updateFormData, setErrors, setAIContext, triggerAIValidation }: WeeklyWageStepProps) {
  const [localErrors, setLocalErrors] = useState<Partial<WeeklyWageStepProps['formData']>>({});

  const validateStep = (): boolean => {
    const newErrors: Partial<WeeklyWageStepProps['formData']> = {};
    if (formData.weeklyWage <= 0) newErrors.weeklyWage = 0; // Changed to 0 instead of string

    setLocalErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSliderChange = (value: number[]) => {
    updateFormData({ weeklyWage: value[0] });
  };

  useEffect(() => {
    setAIContext(`The user's weekly wage is $${formData.weeklyWage}.
      Please analyze this information in the context of minimum wage laws and potential overtime violations.`);
  }, [formData, setAIContext]);

  useEffect(() => {
    if (validateStep()) {
      triggerAIValidation();
    }
  }, [formData]);

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
          step={10}
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
          You are likely a highly compensated employee &amp; thus, exempt from many labor protections. Let&apos;s continue anyway.
        </p>
      )}
      {localErrors.weeklyWage && <p className="text-red-500 text-sm">{localErrors.weeklyWage}</p>}
    </div>
  )
}
