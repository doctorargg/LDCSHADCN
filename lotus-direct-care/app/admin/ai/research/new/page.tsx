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

export default function NewResearchQueryPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    query_text: '',
    query_type: 'topic',
    categories: [] as string[],
    max_results: 10,
    freshness_days: 30,
    min_reliability_score: 0.5,
    schedule_enabled: false,
    schedule_frequency: 'weekly',
  });

  const categoryOptions = [
    'medical',
    'functional-medicine',
    'nutrition',
    'wellness',
    'research',
    'patient-education',
    'news',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/admin/research/queries', {
        method: 'POST',
        headers: getAdminHeaders(),
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        throw new Error(errorData.error || 'Failed to create query');
      }

      console.log('Research query created successfully');
      alert('Research query created successfully!');
      router.push('/admin/ai/research');
    } catch (error) {
      console.error('Error creating query:', error);
      alert('Failed to create research query. Please try again.');
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
        <Link href="/admin/ai/research">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Research Query</h1>
          <p className="mt-1 text-gray-600">
            Configure a new research query to discover relevant content
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Define the research query and its parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Query Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Functional Medicine News"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this query searches for"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="query_text">Search Query</Label>
              <Textarea
                id="query_text"
                value={formData.query_text}
                onChange={(e) => setFormData({ ...formData, query_text: e.target.value })}
                placeholder="e.g., functional medicine latest research gut health microbiome"
                rows={3}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter keywords or phrases to search for across your research sources
              </p>
            </div>

            <div>
              <Label htmlFor="query_type">Query Type</Label>
              <Select
                value={formData.query_type}
                onValueChange={(value) => setFormData({ ...formData, query_type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="topic">Topic Research</SelectItem>
                  <SelectItem value="competitive">Competitive Analysis</SelectItem>
                  <SelectItem value="trending">Trending Topics</SelectItem>
                  <SelectItem value="custom">Custom Query</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filters & Settings</CardTitle>
            <CardDescription>
              Configure how the research should be conducted
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categoryOptions.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Switch
                      id={category}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max_results">Maximum Results</Label>
                <Input
                  id="max_results"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.max_results}
                  onChange={(e) => setFormData({ ...formData, max_results: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="freshness_days">Content Freshness (days)</Label>
                <Input
                  id="freshness_days"
                  type="number"
                  min="0"
                  max="365"
                  value={formData.freshness_days}
                  onChange={(e) => setFormData({ ...formData, freshness_days: parseInt(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  0 = include all content regardless of age
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="min_reliability">Minimum Reliability Score</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="min_reliability"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.min_reliability_score}
                  onChange={(e) => setFormData({ ...formData, min_reliability_score: parseFloat(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm font-medium w-12">
                  {Math.round(formData.min_reliability_score * 100)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduling</CardTitle>
            <CardDescription>
              Configure automatic execution of this research query
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="schedule_enabled"
                checked={formData.schedule_enabled}
                onCheckedChange={(checked: boolean) => 
                  setFormData({ ...formData, schedule_enabled: checked })
                }
              />
              <label
                htmlFor="schedule_enabled"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Enable automatic scheduling
              </label>
            </div>

            {formData.schedule_enabled && (
              <div>
                <Label htmlFor="schedule_frequency">Frequency</Label>
                <Select
                  value={formData.schedule_frequency}
                  onValueChange={(value) => setFormData({ ...formData, schedule_frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/ai/research')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Query'}
          </Button>
        </div>
      </form>
    </div>
  );
}