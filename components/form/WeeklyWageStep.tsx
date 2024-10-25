// WeeklyWageStep component handles collecting and displaying weekly wage information
// Uses a slider input with min/max bounds and calculates implied annual salary
// Shows warning for highly compensated employees who may be exempt from protections
import React from 'react'
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { InfoButton } from "@/components/ui/info-button"

interface WeeklyWageStepProps {
  formData: {
    weeklyWage: number;
  };
  handleSliderChange: (value: number[]) => void;
}

export function WeeklyWageStep({ formData, handleSliderChange }: WeeklyWageStepProps) {
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
    </div>
  )
}