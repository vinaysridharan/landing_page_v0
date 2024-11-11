'use client'

import React from 'react'
import { Field, FormikProps } from 'formik'
import { Label } from "@/components/ui/label"
import { ShieldCheck } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import InfoButton from '@/components/ui/infoButton'
import { FormData } from './utils';

interface ContactFormStepProps {
  formik: FormikProps<FormData>;
}

export function ContactFormStep({ formik }: ContactFormStepProps) {
  const { errors, touched } = formik;

  // React.useEffect(() => {
  //   setAIContext(`Please sense-check the following contact information:
  //     Name: ${values.name}
  //     Email: ${values.email} 
  //     Phone: ${values.phone}

  //     Just make sure if this information appears logical and valid. 
  //     If so, just say "Great!" & assure them you'll get them the support they need. 
  //     If there are instead obvious issues, like a "555" number, flag them for the user and ask them to correct it before moving forward.`);
  // }, [values, setAIContext]);

  return (
    <div className="space-y-6">
      <Label htmlFor="contact-info" className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Contact Information
        <InfoButton content="Your contact information helps us personalize our communication with you and is necessary for any legal proceedings." />
      </Label>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-base font-medium leading-none">
          Your Name
        </Label>
        <Field
          id="name"
          name="name"
          placeholder="Your Name"
          className={`text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] w-full px-3 ${touched.name && errors.name ? 'border-red-500' : ''
            }`}
        />
        {touched.name && errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium leading-none">
          Your Email
        </Label>
        <Field
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          className={`text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] w-full px-3 ${touched.email && errors.email ? 'border-red-500' : ''
            }`}
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-base font-medium leading-none">
          Your Phone Number
        </Label>
        <Field
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your Phone Number (10 digits)"
          className={`text-base border-none outline-none bg-[#ececec] shadow-sm h-10 rounded-xl focus:outline-[#d6e9fd] focus:border-[#d6e9fd] w-full px-3 ${touched.phone && errors.phone ? 'border-red-500' : ''
            }`}
        />
        {touched.phone && errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone}</p>
        )}
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