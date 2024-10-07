import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CountUp } from "./count-up"

export function Statistics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <Card className="border-blue-200 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-green-600">
            <CountUp target={60} duration={2000} />
          </CardTitle>
          <CardDescription className="text-center text-lg">
            of people are eligible for overtime pay
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="border-blue-200 transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-red-600">
            <CountUp target={30} duration={2000} />
          </CardTitle>
          <CardDescription className="text-center text-lg">
            of employers do not pay what is owed
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}