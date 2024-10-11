'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

interface ArticleMetadata {
  title: string
  description: string
  image: string
  siteName: string
  url: string
}

const fetchArticleMetadata = async (url: string): Promise<ArticleMetadata> => {
  const response = await fetch(`/api/fetch-metadata?url=${encodeURIComponent(url)}`)
  console.log("response", response)
  if (!response.ok) {
    throw new Error('Failed to fetch metadata')
  }
  return response.json()
}
// This does not work! Why?
export function ArticlePreviewComponent({ url }: { url: string }) {
  console.log("start", url)
  const [metadata, setMetadata] = useState<ArticleMetadata | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("url", url)
    fetchArticleMetadata(url)
      .then(data => {
        setMetadata(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Error fetching article metadata:', err)
        setError('Failed to load article preview')
        setIsLoading(false)
      })
  }, [url])

  if (isLoading) {
    return <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg"></div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!metadata) {
    return <div className="text-red-500">No metadata available</div>
  }

  return (
    <a href={metadata.url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
        {metadata.image && (
          <div className="relative h-48 w-full">
            <Image
              src={metadata.image}
              alt={metadata.title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2">{metadata.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{metadata.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{metadata.siteName}</span>
            <ExternalLink className="text-blue-500 h-5 w-5" />
          </div>
        </div>
      </div>
    </a>
  )
}