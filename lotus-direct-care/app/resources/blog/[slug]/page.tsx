import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getRelatedPosts, getAllBlogPosts, generateBlogJsonLd } from '@/lib/utils/blog';
import { BlogPost } from '@/components/blog/blog-post';
import { RelatedPosts } from '@/components/blog/related-posts';
import { Separator } from '@/components/ui/separator';
import Script from 'next/script';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Lotus Direct Care',
      description: 'The requested blog post could not be found.',
    };
  }

  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt;
  const seoKeywords = post.seo?.keywords || [...post.categories, ...post.tags];

  return {
    title: `${seoTitle} | Lotus Direct Care Blog`,
    description: seoDescription,
    keywords: seoKeywords.join(', '),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: post.seo?.ogImage || post.featuredImage ? [
        {
          url: post.seo?.ogImage || post.featuredImage!,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: post.seo?.ogImage || post.featuredImage ? [post.seo?.ogImage || post.featuredImage!] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post, 3);
  const currentUrl = `https://lotusdirectcare.com/resources/blog/${slug}`;
  const jsonLd = generateBlogJsonLd(post, currentUrl);

  return (
    <>
      <Script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <BlogPost post={post} url={currentUrl} />
        
        {relatedPosts.length > 0 && (
          <>
            <Separator className="my-16" />
            <RelatedPosts posts={relatedPosts} />
          </>
        )}
      </div>
    </>
  );
}