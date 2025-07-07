import Image from 'next/image';
import Link from 'next/link';
import { Author } from '@/lib/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Twitter, Linkedin, User } from 'lucide-react';

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-10 w-10 text-secondary-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{author.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{author.role}</p>
            <p className="text-sm leading-relaxed mb-4">{author.bio}</p>
            
            {author.social && (
              <div className="flex gap-3">
                {author.social.twitter && (
                  <Link
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {author.social.linkedin && (
                  <Link
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                )}
                {author.social.website && (
                  <Link
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="h-5 w-5" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}