import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types/blog';
import { formatDate } from '@/lib/utils/blog-client';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ArrowRight } from 'lucide-react';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold mb-6">Related Articles</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
            {post.featuredImage && (
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            
            <CardContent className="p-4">
              <Link href={`/resources/blog/${post.slug}`}>
                <h4 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h4>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min</span>
                </div>
                
                <Link 
                  href={`/resources/blog/${post.slug}`}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  Read more
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}