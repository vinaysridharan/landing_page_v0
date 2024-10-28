// ContactFormStep component handles the contact information collection step of the form
// It uses custom Label and Input components for consistent styling and behavior
// InfoButton provides additional context through tooltips
// The form includes validation and error handling for name, email, and phone fields
'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from 'lucide-react'
import { InfoButton } from "@/components/ui/info-button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContactFormStepProps {
  formData: {
    name: string;
    email: string; 
    phone: string;
  };
  updateFormData: (newData: Partial<ContactFormStepProps['formData']>) => void;
  setErrors: React.Dispatch<React.SetStateAction<Partial<ContactFormStepProps['formData']>>>;
  setAIContext: React.Dispatch<React.SetStateAction<string>>;
  triggerAIValidation: () => void;
}

export function ContactFormStep({ formData, updateFormData, setErrors, setAIContext, triggerAIValidation }: ContactFormStepProps) {
  const [localErrors, setLocalErrors] = useState<Partial<ContactFormStepProps['formData']>>({});

  const validateStep = (): boolean => {
    const newErrors: Partial<ContactFormStepProps['formData']> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';

    setLocalErrors(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  useEffect(() => {
    setAIContext(`Please sense-check the following contact information:
      Name: ${formData.name}
      Email: ${formData.email} 
      Phone: ${formData.phone}
      
      Just make sure if this information appears logical and valid. 
      If so, just say "Great!" & assure them you'll get them the support they need. 
      If there are instead obvious issues, like a "555" number, flag them for the user and ask them to correct it before moving forward.`);
  }, [formData, setAIContext]);

  useEffect(() => {
    if (validateStep()) {
      triggerAIValidation();
    }
  }, [formData]);

  return (
    <div className="space-y-6">
      <Label htmlFor="contact-info" className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Contact Information
        <InfoButton content="Your contact information helps us personalize our communication with you and is necessary for any legal proceedings." />
      </Label>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Your Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {localErrors.name && <p className="text-red-500 text-sm">{localErrors.name}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Your Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {localErrors.email && <p className="text-red-500 text-sm">{localErrors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Your Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your Phone Number (10 digits)"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {localErrors.phone && <p className="text-red-500 text-sm">{localErrors.phone}</p>}
      </div>
      <div className="flex items-center space-x-2">
      <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ShieldCheck className="h-8 w-8 text-slate-500 cursor-pointer hover:text-slate-700 -mt-3 mx-auto" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Data Protection: All the information you provide is encrypted both in transit and at rest using industry-standard encryption protocols.</p>
              <p>Encryption Details: We use TLS for data transmission and AES-256 for data storage.</p>
              <p>Data Usage: Your information is used solely for case assessment and communication purposes.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Label htmlFor="data-protection-info" className="-mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          We take your privacy and data security very seriously. Hover over the shield icon to learn more.
        </Label>

      </div>
    </div>
  );
}
