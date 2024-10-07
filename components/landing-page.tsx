'use client'

import { useRef } from 'react'
import { Header } from './Header'
import { Hero } from './Hero'
import { Statistics } from './Statistics'
import { WorkerCategories } from './WorkerCategories'
import { Features } from './Features'
import { CaseAssessmentForm } from './case-assessment-form'

export function LandingPageComponent() {
  const aiAssessmentRef = useRef<HTMLDivElement>(null)

  const scrollToAiAssessment = () => {
    aiAssessmentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <Header />
      <main className="flex-1">
        <Hero scrollToAiAssessment={scrollToAiAssessment} />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl text-center mb-8">We Help Workers Like You</h2>
            <Statistics />
            <WorkerCategories />
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl text-center mb-8">Why Choose SecureCounsel?</h2>
            <Features />
          </div>
        </section>
        <section ref={aiAssessmentRef} className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 animate-gradient-x"></div>
            <div className="absolute inset-0 opacity-50">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2U3ZTkiLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iI2U3ZjNmNCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2YzZTdlOSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik0wIDBoNTAwdjUwMEgweiIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0wIDI1MGg1MDBNMjUwIDBoMHY1MDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIG9wYWNpdHk9Ii4xIi8+PC9zdmc+')] animate-[spin_20s_linear_infinite]"></div>
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl text-center mb-8">Describe Your Situation</h2>
            <CaseAssessmentForm />
          </div>
        </section>
      </main>
    </div>
  )
}

// Keep the CountUp component in this file if it's used elsewhere
export function CountUp({ end, duration, className }: { end: number; duration: number; className?: string }) {
  // ... (keep the existing CountUp implementation)
}
