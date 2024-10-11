import { Button } from "@/components/ui/button"

interface HeroProps {
  scrollToAiAssessment: () => void;
}

export function Hero({ scrollToAiAssessment }: HeroProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 animate-[gradientAnimation_8s_ease_infinite] bg-[length:200%_200%]"></div>
      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzI1NjNlYiI+PC9yZWN0Pgo8cGF0aCBkPSJNMzYgNDZMMjQgMzRMMzYgMjIiIHN0cm9rZT0iIzQ0OTVmZiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              Get the Pay You Deserve
            </h1>
            <p className="mx-auto max-w-[700px] text-white md:text-xl">
              SecureCounsel connects you with legal experts to fight for your unpaid overtime and resolve wage disputes.
            </p>
          </div>
          <div className="space-x-4">
            <Button variant="secondary" className="bg-white text-blue-800 hover:bg-gray-100">Learn More</Button>
            <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-800" onClick={scrollToAiAssessment}>Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  )
}