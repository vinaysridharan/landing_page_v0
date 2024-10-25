import React from 'react'
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { InfoButton } from "@/components/ui/info-button"

interface WorkHoursStepProps {
  formData: {
    hoursWorked: number;
    role: string;
    otherRoleDetails: string;
  };
  errors: {
    role?: string;
    otherRoleDetails?: string;
  };
  handleSliderChange: (value: number[]) => void;
  handleRadioChange: (name: string, value: string) => void;
  handleFormInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function WorkHoursStep({ formData, errors, handleSliderChange, handleRadioChange, handleFormInputChange }: WorkHoursStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="hours-worked" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          How many hours a week would you say you worked on average?
          <InfoButton content="The number of hours you worked is crucial in determining if you're entitled to overtime pay. Overtime regulations typically apply to hours worked over 40 per week." />
        </Label>
        <Slider
          id="hours-worked"
          name="hoursWorked"
          min={1}
          max={80}
          step={1}
          value={[formData.hoursWorked]}
          onValueChange={handleSliderChange}
          className={`w-full ${formData.hoursWorked < 40 ? 'bg-red-200' : formData.hoursWorked > 40 ? 'bg-blue-200' : 'bg-gray-200'}`}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>1</span>
          <span>40</span>
          <span>80+</span>
        </div>
        <p className="text-sm mt-2 font-medium" style={{ color: formData.hoursWorked < 40 ? '#7f1d1d' : formData.hoursWorked > 40 ? '#1e40af' : '#374151' }}>
          {formData.hoursWorked === 80 ? "80 or more hours per week" : `${formData.hoursWorked} hours per week`}
        </p>
        {formData.hoursWorked < 40 ? (
          <p className="text-sm text-red-800 bg-red-100 p-2 rounded-md mt-2">
            While you may not have worked overtime, let's see if you are potentially owed compensation for other violations like meal & rest breaks.
          </p>
        ) : formData.hoursWorked > 40 ? (
          <p className="text-sm text-blue-800 bg-blue-100 p-2 rounded-md mt-2">
            You may be eligible for overtime pay as well as compensation for any other violations.
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium leading-none">
          Which best describes your role?
          <InfoButton content="Your role in the company can affect your classification as exempt or non-exempt from certain labor protections." />
        </Label>
        <RadioGroup value={formData.role} onValueChange={(value) => handleRadioChange('role', value)} className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="routine" id="routine" />
            <Label htmlFor="routine">Do you mainly follow procedures or handle routine tasks?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="management" id="management" />
            <Label htmlFor="management">Do you manage a team, make key decisions, or use expert knowledge regularly?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other-role" />
            <Label htmlFor="other-role">Other (I don't think either of these fit)</Label>
          </div>
        </RadioGroup>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>
      {formData.role === 'other' && (
        <div className="space-y-2">
          <Textarea
            name="otherRoleDetails"
            placeholder="Please describe your role..."
            value={formData.otherRoleDetails}
            onChange={handleFormInputChange}
            className="min-h-[100px]"
            required
          />
          {errors.otherRoleDetails && <p className="text-red-500 text-sm">{errors.otherRoleDetails}</p>}
        </div>
      )}
    </div>
  )
}
