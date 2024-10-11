'use client'

import { motion } from 'framer-motion'

export function Footer() {
  // Defining the fadeIn animation variant locally within the Footer component
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="site-card-bg text-white py-12"
    >
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2024 SecureCounsel. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-300 transition-colors">Contact Us</a>
        </div>
      </div>
    </motion.footer>
  )
}