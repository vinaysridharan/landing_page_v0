import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { InfoButton } from "@/components/ui/info-button";

interface FormData {
  overtimePaid: string;
  otherOvertimeDetails: string;
}

interface Errors {
  overtimePaid?: string;
  otherOvertimeDetails?: string;
}

interface PaidOvertimeStepProps {
  formData: FormData;
  errors: Errors;
  handleRadioChange: (name: string, value: string) => void;
  handleFormInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PaidOvertimeStep: React.FC<PaidOvertimeStepProps> = ({
  formData,
  errors,
  handleRadioChange,
  handleFormInputChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-medium leading-none">
          Were you paid overtime for each hour over 40 - that is, at least 1.5x times your hourly wage?
          <InfoButton content="Overtime pay is a crucial aspect of labor law. Most non-exempt employees are entitled to 1.5 times their regular hourly rate for hours worked beyond 40 in a workweek." />
        </Label>
        <RadioGroup 
          value={formData.overtimePaid} 
          onValueChange={(value) => handleRadioChange('overtimePaid', value)} 
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
        {errors.overtimePaid && <p className="text-red-500 text-sm">{errors.overtimePaid}</p>}
      </div>
      {formData.overtimePaid === 'other' && (
        <div className="space-y-2">
          <Textarea
            name="otherOvertimeDetails"
            placeholder="Please provide details about your overtime pay situation..."
            value={formData.otherOvertimeDetails}
            onChange={handleFormInputChange}
            required
            className='text-base min-h-[100px] border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
          />
          {errors.otherOvertimeDetails && <p className="text-red-500 text-sm">{errors.otherOvertimeDetails}</p>}
        </div>
      )}
    </div>
  );
};
