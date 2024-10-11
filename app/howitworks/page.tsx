import Image from 'next/image';

/**
 * Page component for the "How it works" section.
 * 
 * This component renders a responsive layout explaining the process
 * using a series of images and descriptions.
 * 
 * @returns {JSX.Element} The rendered "How it works" page
 */
export default function Page() {
  const steps = [
    { src: "/howitworks/Fill_Form_SVG.svg", alt: "Fill Form", description: "Fill out our simple form" },
    { src: "/howitworks/Meet_Lawyer_SVG.svg", alt: "Meet Lawyer", description: "Meet with a specialized lawyer" },
    { src: "/howitworks/Lawyer_Negotiates_Settlement_SVG.svg", alt: "Lawyer Negotiates Settlement", description: "Your lawyer negotiates a settlement" },
    { src: "/howitworks/Receive_Settlement_SVG.svg", alt: "Receive Settlement", description: "Receive your settlement" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <Header /> */}
      <h1 className="text-4xl font-bold text-center mb-12">How it works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Image 
              src={step.src} 
              alt={step.alt} 
              width={200} 
              height={200} 
              className="mb-4"
            />
            <p className="text-lg font-semibold">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}