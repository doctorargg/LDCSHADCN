'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { getAdminHeaders } from '@/lib/admin-auth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewResearchSourcePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    domain: '',
    source_type: 'website',
    categories: [] as string[],
    crawl_frequency: 'weekly',
    is_active: true,
    max_depth: 2,
    include_patterns: [] as string[],
    exclude_patterns: [] as string[],
    reliability_score: 0.8,
    notes: '',
  });

  const categoryOptions = [
    'medical',
    'functional-medicine',
    'nutrition',
    'wellness',
    'research',
    'patient-education',
    'news',
    'peer-reviewed',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Submitting source data:', formData);
      
      const response = await fetch('/api/admin/research/sources', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        throw new Error(errorData.error || 'Failed to create source');
      }

      console.log('Research source created successfully');
      alert('Research source created successfully!');
      router.push('/admin/ai/research/sources');
    } catch (error) {
      console.error('Error creating source:', error);
      alert(error instanceof Error ? error.message : 'Failed to create research source. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/ai/research/sources">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Research Source</h1>
          <p className="mt-1 text-gray-600">
            Configure a new source for medical research content
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Configure the basic details of your research source
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Source Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Mayo Clinic Health Library"
              />
            </div>

            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://www.mayoclinic.org/diseases-conditions"
              />
            </div>

            <div>
              <Label htmlFor="source_type">Source Type</Label>
              <Select
                value={formData.source_type}
                onValueChange={(value) => setFormData({ ...formData, source_type: value })}
              >
                <SelectTrigger id="source_type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="journal">Journal</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reliability_score">Reliability Score (0-1)</Label>
              <Input
                id="reliability_score"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={formData.reliability_score}
                onChange={(e) => setFormData({ ...formData, reliability_score: parseFloat(e.target.value) })}
              />
              <p className="text-sm text-gray-500 mt-1">
                Higher scores indicate more reliable sources
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Select relevant categories for this source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant={formData.categories.includes(category) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crawl Settings</CardTitle>
            <CardDescription>
              Configure how content is discovered from this source
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="crawl_frequency">Crawl Frequency</Label>
              <Select
                value={formData.crawl_frequency}
                onValueChange={(value) => setFormData({ ...formData, crawl_frequency: value })}
              >
                <SelectTrigger id="crawl_frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="manual">Manual Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="max_depth">Maximum Crawl Depth</Label>
              <Input
                id="max_depth"
                type="number"
                min="1"
                max="5"
                value={formData.max_depth}
                onChange={(e) => setFormData({ ...formData, max_depth: parseInt(e.target.value) })}
              />
              <p className="text-sm text-gray-500 mt-1">
                How many levels deep to crawl from the main URL
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_active">Active</Label>
                <p className="text-sm text-gray-500">
                  Enable this source for research queries
                </p>
              </div>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes about this source..."
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Source'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}