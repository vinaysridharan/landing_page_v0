'use client'

import React from 'react'
import { Field, FormikProps } from 'formik'
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import InfoButton from '@/components/ui/infoButton'
import { FormData } from './utils';

interface WorkHoursStepProps {
  formik: FormikProps<FormData>;
}

export function WorkHoursStep({ formik }: WorkHoursStepProps) {
  const { values, errors, touched, setFieldValue } = formik;

  // React.useEffect(() => {
  //   setAIContext(`The user works ${values.hoursWorked} hours per week on average.
  //     Their role is described as: ${values.role}
  //     ${values.role === 'other' ? `Additional role details: ${values.otherRoleDetails}` : ''}
  //     Please analyze this information for potential overtime violations and exemption status.`);
  // }, [values, setAIContext]);

  const handleSliderChange = (value: number[]) => {
    setFieldValue('hoursWorked', value[0]);
  };

  const handleRadioChange = (value: string) => {
    setFieldValue('role', value);
    if (value !== 'other') {
      setFieldValue('otherRoleDetails', '');
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label 
          htmlFor="hoursWorked" 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          How many hours a week would you say you worked on average?
          <InfoButton content="The number of hours you worked is crucial in determining if you're entitled to overtime pay. Overtime regulations typically apply to hours worked over 40 per week." />
        </Label>
        <Slider
          id="hoursWorked"
          name="hoursWorked"
          min={1}
          max={80}
          step={1}
          value={[values.hoursWorked]}
          onValueChange={handleSliderChange}
          className={`w-full ${values.hoursWorked < 40 ? 'bg-red-200' : values.hoursWorked > 40 ? 'bg-blue-200' : 'bg-gray-200'}`}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>1</span>
          <span>40</span>
          <span>80+</span>
        </div>
        <p className="text-sm mt-2 font-medium" 
           style={{ color: values.hoursWorked < 40 ? '#7f1d1d' : values.hoursWorked > 40 ? '#1e40af' : '#374151' }}
        >
          {values.hoursWorked === 80 ? "80 or more hours per week" : `${values.hoursWorked} hours per week`}
        </p>
        {values.hoursWorked < 40 ? (
          <p className="text-sm text-red-800 bg-red-100 p-2 rounded-md mt-2">
            While you may not have worked overtime, let&apos;s see if you are potentially owed compensation for other violations like meal & rest breaks.
          </p>
        ) : values.hoursWorked > 40 ? (
          <p className="text-sm text-blue-800 bg-blue-100 p-2 rounded-md mt-2">
            You may be eligible for overtime pay as well as compensation for any other violations.
          </p>
        ) : null}
        {touched.hoursWorked && errors.hoursWorked && (
          <p className="text-red-500 text-sm">{errors.hoursWorked}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium leading-none">
          Which best describes your role?
          <InfoButton content="Your role in the company can affect your classification as exempt or non-exempt from certain labor protections." />
        </Label>
        <RadioGroup 
          value={values.role} 
          onValueChange={handleRadioChange} 
          className="flex flex-col space-y-1"
        >
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
            <Label htmlFor="other-role">Other (I don&apos;t think either of these fit)</Label>
          </div>
        </RadioGroup>
        {touched.role && errors.role && (
          <p className="text-red-500 text-sm">{errors.role}</p>
        )}
      </div>

      {values.role === 'other' && (
        <div className="space-y-2">
          <Field
            as={Textarea}
            name="otherRoleDetails"
            placeholder="Please describe your role..."
            className={`min-h-[100px] ${
              touched.otherRoleDetails && errors.otherRoleDetails ? 'border-red-500' : ''
            }`}
          />
          {touched.otherRoleDetails && errors.otherRoleDetails && (
            <p className="text-red-500 text-sm">{errors.otherRoleDetails}</p>
          )}
        </div>
      )}
    </div>
  );
}