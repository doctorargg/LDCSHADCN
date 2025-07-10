'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';

const blogTopics = [
  "Understanding Functional Medicine: A Root-Cause Approach to Chronic Illness",
  "The Gut-Brain Connection: How Your Digestive Health Affects Mental Wellness",
  "Direct Primary Care: Healthcare Without the Insurance Hassles",
  "Metabolic Health: Why Weight Loss Isn't Just About Calories",
  "Biomarkers of Aging: What Your Labs Really Tell You",
  "Ketamine Therapy: A Breakthrough Treatment for Depression",
  "Food as Medicine: Nutritional Strategies for Chronic Conditions",
  "Custom Topic",
];

export default function GenerateBlogPage() {
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('Patients seeking holistic healthcare solutions');
  const [wordCount, setWordCount] = useState('1000');
  const [tone, setTone] = useState('Professional yet approachable');
  const [publish, setPublish] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const finalTopic = topic === 'Custom Topic' ? customTopic : topic;

    try {
      const response = await fetch('/api/ai-blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent
        body: JSON.stringify({
          topic: finalTopic,
          targetAudience,
          wordCount: parseInt(wordCount),
          tone,
          includeCallToAction: true,
          publish,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/ai/blog');
      } else {
        setError(data.error || 'Failed to generate blog post');
      }
    } catch (err) {
      setError('An error occurred while generating the blog post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate AI Blog Post
          </CardTitle>
          <CardDescription>
            Create a new blog post using AI. The post will be generated based on your specifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={setTopic} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic or choose custom" />
                </SelectTrigger>
                <SelectContent>
                  {blogTopics.map((t: any) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {topic === 'Custom Topic' && (
              <div className="space-y-2">
                <Label htmlFor="customTopic">Custom Topic</Label>
                <Textarea
                  id="customTopic"
                  placeholder="Enter your custom blog topic..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  required
                  rows={3}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Who is this blog post for?"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wordCount">Word Count</Label>
                <Select value={wordCount} onValueChange={setWordCount}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">~500 words</SelectItem>
                    <SelectItem value="800">~800 words</SelectItem>
                    <SelectItem value="1000">~1000 words</SelectItem>
                    <SelectItem value="1200">~1200 words</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professional yet approachable">Professional yet approachable</SelectItem>
                    <SelectItem value="Educational and authoritative">Educational and authoritative</SelectItem>
                    <SelectItem value="Conversational and friendly">Conversational and friendly</SelectItem>
                    <SelectItem value="Empathetic and supportive">Empathetic and supportive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="publish"
                checked={publish}
                onChange={(e) => setPublish(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="publish" className="text-sm font-normal">
                Publish immediately after generation
              </Label>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !topic}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}