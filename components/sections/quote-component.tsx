'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function QuoteComponent() {
  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardContent className="p-6">
        <Quote className="w-10 h-10 text-blue-500 mb-4" />
        <blockquote className="space-y-2">
          <p className="text-lg text-gray-800 leading-relaxed">
            "If all of this is shocking to you, what is more shocking is the modern breadth of misclassification...it is <span className='font-bold text-blue-700'>everywhere</span>. Misclassification takes billions from working people and gives it to lawbreakers. It is a pervasive and national scandal."
          </p>
          <footer className="text-right">
            <cite className="text-blue-600 font-semibold">
              Commissioner Boya, Federal Trade Commission
            </cite>
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  )
}