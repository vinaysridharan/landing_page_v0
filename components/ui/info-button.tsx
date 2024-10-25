'use client'

import React, {ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Info } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

/**
 * InfoButton Component
 * 
 * A reusable button component that displays information in a slide-out sheet when clicked.
 * Uses shadcn/ui Sheet component for the slide-out panel and Lucide icons for the button.
 * 
 * @component
 * @param {Object} props
 * @param {ReactNode} props.content - The content to display in the sheet. Can be any valid React node.
 */
export const InfoButton: React.FC<InfoButtonProps> = ({ content }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
        <Info className="h-4 w-4" />
        <span className="sr-only">Why is this important?</span>
      </Button>
    </SheetTrigger>
    <SheetContent className="bg-white">
      <SheetHeader>
        <SheetTitle className="text-lg font-semibold text-gray-900">Why is this important?</SheetTitle>
        <SheetDescription className="mt-2 text-sm text-gray-700">
          {content}
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
)

interface InfoButtonProps {
  content: ReactNode;
}