import Image from 'next/image'

export function WorkerCategories() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <div className="flex flex-col items-center">
        <Image
          src="/images/worker-healthcare.jpg"
          alt="Smiling nurse"
          width={200}
          height={200}
          className="rounded-full mb-4 border-4 border-blue-200"
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Healthcare Workers</h3>
        <p className="text-center text-gray-600">Nurses, medical assistants, and caregivers deserve fair compensation for their dedication.</p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="Smiling construction worker"
          width={200}
          height={200}
          className="rounded-full mb-4 border-4 border-blue-200"
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Construction Workers</h3>
        <p className="text-center text-gray-600">Builders, electricians, and plumbers should be paid for every hour they work, including overtime.</p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="Smiling IT support professional"
          width={200}
          height={200}
          className="rounded-full mb-4 border-4 border-blue-200"
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">IT Professionals</h3>
        <p className="text-center text-gray-600">Tech support, developers, and system administrators often work long hours that should be compensated.</p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="Smiling team"
          width={200}
          height={200}
          className="rounded-full mb-4 border-4 border-blue-200"
        />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">And more...</h3>
        <p className="text-center text-gray-600">From office workers to factory workers, wage & hour laws protect nearly everyone.</p>
      </div>
    </div>
  )
}