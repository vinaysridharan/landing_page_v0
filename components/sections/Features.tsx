import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Scale, Clock, MessageSquare } from 'lucide-react'

export function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card className="border-blue-200 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <Scale className="w-8 h-8 mb-2 text-blue-600" />
          <CardTitle className="text-gray-900">Expert Legal Advice</CardTitle>
          <CardDescription>Get guidance from experienced employment law attorneys.</CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-blue-200 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <Clock className="w-8 h-8 mb-2 text-blue-600" />
          <CardTitle className="text-gray-900">Quick Response</CardTitle>
          <CardDescription>Receive prompt attention to your case within 24 hours.</CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-blue-200 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <MessageSquare className="w-8 h-8 mb-2 text-blue-600" />
          <CardTitle className="text-gray-900">AI-Powered Analysis</CardTitle>
          <CardDescription>Our AI quickly assesses your situation for faster results.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}