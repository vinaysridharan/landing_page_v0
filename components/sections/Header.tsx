/* eslint-disable react/no-unescaped-entities */
"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  const [open, setOpen] = useState(false)
  const [showRedBar, setShowRedBar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowRedBar(false)
      } else {
        setShowRedBar(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div 
        className={`h-10 flex justify-center items-center bg-red-500 text-white overflow-hidden transition-all duration-300 ease-in-out ${
          showRedBar ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        Don't wait! Statute of limitations may apply. Get your free case review now before it's too late.
      </div>
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo-icon.svg"
              alt="SecureCounsel Logo"
              width={50}
              height={50}
              className="h-20 w-20"
            />
            <div className="hidden font-bold font-mono sm:inline-block text-yellow-700">
              <span className="text-black">Secure</span>Counsel
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-black font-medium text-base">
          <Link className="transition-colors hover:text-blue-700" href="/howitworks">
            How It Works
          </Link>
          <Link className="transition-colors hover:text-blue-700" href="/learningcenter">
            Learning Center
          </Link>
          <Link className="transition-colors hover:text-blue-700" href="#">
            About Us
          </Link>
          <Link className="transition-colors hover:text-blue-700" href="#">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4 mr-10">
          <Button className="hidden md:flex">Get Started</Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link className="text-sm font-medium hover:underline" href="#" onClick={() => setOpen(false)}>
                  How It Works
                </Link>
                <Link className="text-sm font-medium hover:underline" href="#" onClick={() => setOpen(false)}>
                  Success Stories
                </Link>
                <Link className="text-sm font-medium hover:underline" href="#" onClick={() => setOpen(false)}>
                  About Us
                </Link>
                <Link className="text-sm font-medium hover:underline" href="#" onClick={() => setOpen(false)}>
                  Contact
                </Link>
                <Button className="mt-4 hover:scale-105">Get Started</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}