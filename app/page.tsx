import AnimatedLandingPageComponent  from "@/components/animated-landing-page"
/**
 * Page component for the experimental landing page.
 * 
 * This component renders the AnimatedLandingPageComponent, which is imported
 * from a separate file. The import statement uses destructuring to import
 * the named export 'AnimatedLandingPageComponent' instead of using a default import.
 * 
 * @returns {JSX.Element} The rendered AnimatedLandingPageComponent
 */
export default function Page() {
  return <AnimatedLandingPageComponent />
}