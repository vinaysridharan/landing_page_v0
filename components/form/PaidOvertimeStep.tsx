'use client'

import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { InfoButton } from "@/components/ui/info-button";

interface PaidOvertimeStepProps {
  formData: {
    overtimePaid: string;
    otherOvertimeDetails: string;
  };
  updateFormData: (newData: Partial<PaidOvertimeStepProps['formData']>) => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<PaidOvertimeStepProps['formData']>>>;
  setAIContext: React.Dispatch<React.SetStateAction<string>>;
  triggerAIValidation: () => void;
}

export function PaidOvertimeStep({ formData, updateFormData, setErrors, setAIContext, triggerAIValidation }: PaidOvertimeStepProps) {
  const [localErrors, setLocalErrors] = useState<Partial<PaidOvertimeStepProps['formData']>>({});

  const validateStep = (): boolean => {
    const newErrors: Partial<PaidOvertimeStepProps['formData']> = {};
    if (!formData.overtimePaid) newErrors.overtimePaid = 'Please select an option';
    if (formData.overtimePaid === 'other' && !formData.otherOvertimeDetails.trim()) {
      newErrors.otherOvertimeDetails = 'Please provide details';
    }

    setLocalErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRadioChange = (value: string) => {
    updateFormData({ overtimePaid: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ otherOvertimeDetails: e.target.value });
  };

  useEffect(() => {
    setAIContext(`The user has indicated that their overtime payment status is: ${formData.overtimePaid}
      ${formData.overtimePaid === 'other' ? `Additional details: ${formData.otherOvertimeDetails}` : ''}
      Please analyze this information and provide guidance on potential overtime violations.`);
  }, [formData, setAIContext]);

  useEffect(() => {
    if (validateStep()) {
      triggerAIValidation();
    }
  }, [formData]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium leading-none">
          Were you paid overtime for each hour over 40 - that is, at least 1.5x times your hourly wage?
          <InfoButton content="Overtime pay is a crucial aspect of labor law. Most non-exempt employees are entitled to 1.5 times their regular hourly rate for hours worked beyond 40 in a workweek." />
        </Label>
        <RadioGroup 
          value={formData.overtimePaid} 
          onValueChange={handleRadioChange} 
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label className='text-base' htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label className='text-base' htmlFor="no">No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label className='text-base' htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
        {localErrors.overtimePaid && <p className="text-red-500 text-sm">{localErrors.overtimePaid}</p>}
      </div>
      {formData.overtimePaid === 'other' && (
        <div className="space-y-2">
          <Textarea
            name="otherOvertimeDetails"
            placeholder="Please provide details about your overtime pay situation..."
            value={formData.otherOvertimeDetails}
            onChange={handleTextareaChange}
            required
            className='text-base min-h-[100px] border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
          />
          {localErrors.otherOvertimeDetails && <p className="text-red-500 text-sm">{localErrors.otherOvertimeDetails}</p>}
        </div>
      )}
    </div>
  );
}
