'use client';

import Image from 'next/image';
import { BlogPost as BlogPostType } from '@/lib/types/blog';
import { formatDate } from '@/lib/utils/blog-client';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, User } from 'lucide-react';
import { AuthorBio } from './author-bio';
import { SocialShare } from './social-share';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useEffect, useState } from 'react';

interface BlogPostProps {
  post: BlogPostType;
  url: string;
}

export function BlogPost({ post, url }: BlogPostProps) {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    // Extract headings from the content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content;
    const headingElements = tempDiv.querySelectorAll('h2, h3');
    
    const extractedHeadings = Array.from(headingElements).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.substring(1)),
    }));
    
    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
      }
    );

    // Observe all headings
    extractedHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [post.content]);

  return (
    <article className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-secondary-foreground" />
              </div>
            )}
            <span className="font-medium">{post.author.name}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <SocialShare url={url} title={post.title} description={post.excerpt} />
      </header>

      {post.featuredImage && (
        <div className="relative h-[400px] md:h-[500px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents - Desktop Only */}
        {headings.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="font-semibold mb-4">Table of Contents</h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      className={`${
                        heading.level === 3 ? 'ml-4' : ''
                      } transition-colors`}
                    >
                      <a
                        href={`#${heading.id}`}
                        className={`block py-1 hover:text-primary ${
                          activeHeading === heading.id
                            ? 'text-primary font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className={`${headings.length > 0 ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ children, ...props }) => {
                  const id = `heading-${headings.findIndex(h => h.text === String(children))}`;
                  return <h2 id={id} {...props}>{children}</h2>;
                },
                h3: ({ children, ...props }) => {
                  const id = `heading-${headings.findIndex(h => h.text === String(children))}`;
                  return <h3 id={id} {...props}>{children}</h3>;
                },
                img: ({ src, alt, width, height, ...props }) => (
                  <Image
                    src={typeof src === 'string' ? src : ''}
                    alt={alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg"
                    {...props}
                  />
                ),
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Author Bio */}
          <AuthorBio author={post.author} />
        </div>
      </div>
    </article>
  );
}