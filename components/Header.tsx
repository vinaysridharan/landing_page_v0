import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Gavel, Menu } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex items-center flex-1">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="SecureCounsel Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <Link className="flex items-center justify-center" href="#">
            <Gavel className="h-6 w-6 text-blue-600" />
            <span className="ml-2 text-lg font-bold text-gray-900">SecureCounsel</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            How It Works
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            Success Stories
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            About Us
          </Link>
          <Link className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            Contact
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-b border-gray-200 p-4">
          <Link className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            How It Works
          </Link>
          <Link className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            Success Stories
          </Link>
          <Link className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            About Us
          </Link>
          <Link className="block py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#">
            Contact
          </Link>
        </nav>
      )}
    </>
  )
}