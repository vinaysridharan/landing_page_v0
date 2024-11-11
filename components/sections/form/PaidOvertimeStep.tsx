'use client'

import React, { useEffect } from 'react';
import { Field, FormikProps } from 'formik';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import InfoButton from '@/components/ui/infoButton';
import { FormData } from './utils';


interface PaidOvertimeStepProps {
  formik: FormikProps<FormData>;
}

export function PaidOvertimeStep({ formik }: PaidOvertimeStepProps) {
  const { values, errors, touched, setFieldValue } = formik;

  // React.useEffect(() => {
  //   setAIContext(`The user has indicated that their overtime payment status is: ${values.overtimePaid}
  //     ${values.overtimePaid === 'other' ? `Additional details: ${values.otherOvertimeDetails}` : ''}
  //     Please analyze this information and provide guidance on potential overtime violations.`);
  // }, [values, setAIContext]);

  const handleRadioChange = (value: string) => {
    setFieldValue('overtimePaid', value);
    if (value !== 'other') {
      setFieldValue('otherOvertimeDetails', '');
    }
  };

  useEffect(() => {
    console.log("formik: ", formik)
  }, [formik])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium leading-none">
          Were you paid overtime for each hour over 40 - that is, at least 1.5x times your hourly wage?
          <InfoButton content="Overtime pay is a crucial aspect of labor law. Most non-exempt employees are entitled to 1.5 times their regular hourly rate for hours worked beyond 40 in a workweek." />
        </Label>
        <RadioGroup 
          value={values.overtimePaid} 
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
        {touched.overtimePaid && errors.overtimePaid && (
          <p className="text-red-500 text-sm">{errors.overtimePaid}</p>
        )}
      </div>

      {values.overtimePaid === 'other' && (
        <div className="space-y-2">
          <Field
            as={Textarea}
            name="otherOvertimeDetails"
            placeholder="Please provide details about your overtime pay situation..."
            className={`text-base min-h-[100px] border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] ${
              touched.otherOvertimeDetails && errors.otherOvertimeDetails ? 'border-red-500' : ''
            }`}
          />
          {touched.otherOvertimeDetails && errors.otherOvertimeDetails && (
            <p className="text-red-500 text-sm">{errors.otherOvertimeDetails}</p>
          )}
        </div>
      )}
    </div>
  );
}