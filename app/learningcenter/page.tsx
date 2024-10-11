'use client'
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Page component for the "Learning Center" section.
 * 
 * This component renders a responsive layout for blog posts about wage & hour laws.
 * Each card is clickable and opens up a new article.
 * 
 * @returns {JSX.Element} The rendered "Learning Center" page
 */
export default function Page() {
  // Array of blog posts with their respective icons, titles, and links
  const blogPosts = [
    { icon: "/icons/wage_laws.svg", title: "Understanding Wage Laws", link: "/blog/understanding-wage-laws" },
    { icon: "/icons/overtime_rules.svg", title: "Overtime Rules Explained", link: "/blog/overtime-rules-explained" },
    { icon: "/icons/employee_rights.svg", title: "Employee Rights Overview", link: "/blog/employee-rights-overview" },
    { icon: "/icons/legal_advice.svg", title: "Legal Advice for Workers", link: "/blog/legal-advice-for-workers" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-indigo-900">Learning Center</h1>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={post.link}>
              <div className="site-card-bg rounded-lg shadow-xl p-8 text-center transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center cursor-pointer">
                <Image
                  src={post.icon} 
                  alt={post.title} 
                  width={100} 
                  height={100} 
                  className="mb-4"
                />  
                <p className="text-lg text-white font-semibold">{post.title}</p>
                <ChevronRight className="h-6 w-6 text-white mt-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}