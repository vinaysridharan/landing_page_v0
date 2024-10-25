// ContactFormStep component handles the contact information collection step of the form
// It uses custom Label and Input components for consistent styling and behavior
// InfoButton provides additional context through tooltips
// The form includes validation and error handling for name, email, and phone fields
'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck } from 'lucide-react'
import { InfoButton } from "@/components/ui/info-button"

interface ContactFormStepProps {
  formData: {
    name: string;
    email: string; 
    phone: string;
  };
  errors: {
    name?: string;
    email?: string;
    phone?: string;
  };
  handleFormInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ContactFormStep({ formData, errors, handleFormInputChange }: ContactFormStepProps) {
  // Remove this line
  // const { setIsLoading } = useForm();

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
          onChange={handleFormInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
          onChange={handleFormInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
          onChange={handleFormInputChange}
          required
          className='text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd]'
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <ShieldCheck className="h-8 w-8 text-slate-500" />
        <Label htmlFor="data-protection-info" className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          We take your privacy and data security very seriously
        </Label>
        <InfoButton content={
          <>
            <p className="text-sm text-gray-600">
              <strong>Data Protection:</strong> All the information you provide is encrypted both in transit and at rest using industry-standard encryption protocols.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Encryption Details:</strong> We use TLS for data transmission and AES-256 for data storage.
            </p>
            <p className="text-sm text-gray-600">
              <strong>Data Usage:</strong> Your information is used solely for case assessment and communication purposes.
            </p>
          </>
        } />
      </div>
      
    </div>
  );
}
