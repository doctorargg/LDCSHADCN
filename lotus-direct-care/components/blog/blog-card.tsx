import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types/blog';
import { formatDate } from '@/lib/utils/blog-client';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <CardContent className="flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        <Link href={`/resources/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 border-t">
        <div className="flex items-center gap-3">
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
          <div>
            <p className="text-sm font-medium">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.author.role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}