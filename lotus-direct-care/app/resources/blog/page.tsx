import { Metadata } from 'next';
import { getAllBlogPosts, getPaginatedPosts, getAllCategories } from '@/lib/utils/blog';
import { BlogList } from '@/components/blog/blog-list';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { HeroWithImage } from '@/components/layout/hero-with-image';

export const metadata: Metadata = {
  title: 'Blog | Lotus Direct Care - Functional Medicine Insights',
  description: 'Expert insights on functional medicine, longevity, integrative therapies, and holistic health from Dr. Aaron Rosenberg.',
  openGraph: {
    title: 'Blog | Lotus Direct Care - Functional Medicine Insights',
    description: 'Expert insights on functional medicine, longevity, integrative therapies, and holistic health from Dr. Aaron Rosenberg.',
    type: 'website',
  },
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const selectedCategory = params.category;
  const selectedTag = params.tag;

  let allPosts = await getAllBlogPosts();
  
  // Filter by category if selected
  if (selectedCategory) {
    allPosts = allPosts.filter(post => 
      post.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
    );
  }
  
  // Filter by tag if selected
  if (selectedTag) {
    allPosts = allPosts.filter(post => 
      post.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
    );
  }

  const { posts, pagination } = getPaginatedPosts(allPosts, currentPage);
  const categories = await getAllCategories();

  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus_blog_hero.png"
        imageAlt="Lotus flower representing knowledge and wellness insights at Lotus Direct Care"
        title="Functional Medicine Insights"
        subtitle="Expert perspectives on holistic health, longevity medicine, and integrative therapies from Dr. Aaron Rosenberg and the Lotus Direct Care team."
        showCTA={false}
        minHeight="min-h-[40vh]"
      />
      
      <div className="container mx-auto px-4 py-12">

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/resources/blog">
              <Badge 
                variant={!selectedCategory ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-secondary"
              >
                All Posts
              </Badge>
            </Link>
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/resources/blog?category=${encodeURIComponent(category.name)}`}
              >
                <Badge 
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-secondary"
                >
                  {category.name} ({category.count})
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(selectedCategory || selectedTag) && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          {selectedCategory && (
            <Badge variant="secondary">
              Category: {selectedCategory}
              <Link 
                href="/resources/blog" 
                className="ml-2 hover:text-destructive"
              >
                ×
              </Link>
            </Badge>
          )}
          {selectedTag && (
            <Badge variant="secondary">
              Tag: {selectedTag}
              <Link 
                href="/resources/blog" 
                className="ml-2 hover:text-destructive"
              >
                ×
              </Link>
            </Badge>
          )}
        </div>
      )}

      {/* Blog Posts */}
      <BlogList posts={posts} pagination={pagination} />
    </div>
    </>
  );
}