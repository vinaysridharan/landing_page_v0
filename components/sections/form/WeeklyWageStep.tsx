'use client'

import React from 'react'
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import InfoButton from '@/components/ui/infoButton'
import { FormData } from './utils';
import { FormikProps } from 'formik'

interface WeeklyWageStepProps {
  formik: FormikProps<FormData>;
}

export function WeeklyWageStep({ formik }: WeeklyWageStepProps) {
  const { values, errors, touched, setFieldValue } = formik;

  // React.useEffect(() => {
  //   setAIContext(`The user's weekly wage is $${values.weeklyWage}.
  //     Please analyze this information in the context of minimum wage laws and potential overtime violations.`);
  // }, [values.weeklyWage, setAIContext]);

  const handleSliderChange = (value: number[]) => {
    setFieldValue('weeklyWage', value[0]);
  };

  const calculateAnnualWage = (weeklyWage: number): number => {
    return weeklyWage * 52;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label 
          htmlFor="weeklyWage" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Weekly Wage: ${values.weeklyWage}
          <InfoButton content="Your wage information is crucial for calculating potential unpaid wages or overtime. It helps us determine if you were paid fairly according to labor laws." />
        </Label>
        <Slider
          id="weeklyWage"
          name="weeklyWage"
          min={0}
          max={3000}
          step={10}
          value={[values.weeklyWage]}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        {touched.weeklyWage && errors.weeklyWage && (
          <p className="text-red-500 text-sm">{errors.weeklyWage}</p>
        )}
      </div>

      <p className="text-sm font-medium text-blue-600">
        Implied Annual Wage: ${calculateAnnualWage(values.weeklyWage).toLocaleString()}
      </p>

      {values.weeklyWage >= 3000 && (
        <p className="text-sm text-yellow-800 bg-yellow-100 p-2 rounded-md mt-2">
          You are likely a highly compensated employee &amp; thus, exempt from many labor protections. Let&apos;s continue anyway.
        </p>
      )}
    </div>
  );
}