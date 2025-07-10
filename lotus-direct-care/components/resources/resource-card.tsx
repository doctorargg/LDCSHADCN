"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, ExternalLink, FileText } from 'lucide-react'
import Link from 'next/link'

export interface ResourceCardProps {
  title: string
  description: string
  type: 'form' | 'guide' | 'article' | 'external'
  category?: string
  href?: string
  downloadUrl?: string
  fileSize?: string
  lastUpdated?: string
  featured?: boolean
}

export function ResourceCard({
  title,
  description,
  type,
  category,
  href,
  downloadUrl,
  fileSize,
  lastUpdated,
  featured = false,
}: ResourceCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'form':
        return FileText
      case 'external':
        return ExternalLink
      default:
        return ArrowRight
    }
  }

  const Icon = getIcon()

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${featured ? 'border-teal-200 border-2' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="space-y-1">
            {category && (
              <Badge variant="secondary" className="text-xs mb-2">
                {category}
              </Badge>
            )}
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          {featured && (
            <Badge className="bg-teal-600 text-white">
              Featured
            </Badge>
          )}
        </div>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {fileSize && (
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {fileSize}
            </span>
          )}
          {lastUpdated && (
            <span>Updated: {lastUpdated}</span>
          )}
        </div>
        
        {downloadUrl ? (
          <Button 
            asChild 
            variant="outline" 
            className="w-full group"
          >
            <a 
              href={downloadUrl} 
              download
              className="flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download {type === 'form' ? 'Form' : 'Resource'}
            </a>
          </Button>
        ) : href ? (
          <Button 
            asChild 
            variant="outline" 
            className="w-full group"
          >
            {type === 'external' ? (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                View Resource
                <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            ) : (
              <Link 
                href={href}
                className="flex items-center justify-center gap-2"
              >
                Read More
                <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}