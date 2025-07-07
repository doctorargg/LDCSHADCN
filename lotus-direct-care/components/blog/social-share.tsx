'use client';

import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Linkedin, Link2, Mail } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description || title + '\n\n' + url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // Simple feedback without toast for now
      const button = document.querySelector('[aria-label="Copy link"]');
      if (button) {
        const originalText = button.textContent;
        button.textContent = '✓';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400,menubar=no,toolbar=no');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.twitter)}
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.facebook)}
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => openShareWindow(shareLinks.linkedin)}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.location.href = shareLinks.email}
        aria-label="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}