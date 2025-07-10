'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Save, Loader2, Brain, Mail, FileText, Key } from 'lucide-react';

interface AISettings {
  // Email Settings
  emailResponseEnabled: boolean;
  emailResponseDelay: number;
  emailModel: string;
  emailTemperature: number;
  emailMaxTokens: number;
  
  // Blog Settings
  blogGenerationEnabled: boolean;
  blogSchedule: string;
  blogWordCount: number;
  blogModel: string;
  blogTemperature: number;
  
  // API Keys (masked)
  anthropicKey: string;
  openaiKey: string;
  googleKey: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AISettings>({
    emailResponseEnabled: true,
    emailResponseDelay: 120000,
    emailModel: 'claude-3-5-sonnet-20241022',
    emailTemperature: 0.7,
    emailMaxTokens: 4000,
    blogGenerationEnabled: true,
    blogSchedule: '0 9 * * 1',
    blogWordCount: 1000,
    blogModel: 'claude-3-5-sonnet-20241022',
    blogTemperature: 0.7,
    anthropicKey: '••••••••••••••••',
    openaiKey: '••••••••••••••••',
    googleKey: '••••••••••••••••',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // In a real app, you would load settings from an API
  useEffect(() => {
    // Simulate loading settings
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // In a real app, you would save to an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('Settings saved successfully!');
    } catch (error) {
      setSaveMessage('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure AI models, API keys, and automation settings
        </p>
      </div>

      <Tabs defaultValue="email" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Response Settings</CardTitle>
              <CardDescription>
                Configure how AI responds to patient inquiries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-enabled">Enable AI Email Responses</Label>
                  <p className="text-sm text-gray-500">
                    Automatically respond to patient inquiries
                  </p>
                </div>
                <Switch
                  id="email-enabled"
                  checked={settings.emailResponseEnabled}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, emailResponseEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-delay">Response Delay (minutes)</Label>
                <Input
                  id="email-delay"
                  type="number"
                  min="0"
                  max="60"
                  value={settings.emailResponseDelay / 60000}
                  onChange={(e) => 
                    setSettings({ 
                      ...settings, 
                      emailResponseDelay: parseInt(e.target.value) * 60000 
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  Wait time before sending AI response (0-60 minutes)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-model">AI Model</Label>
                <Select 
                  value={settings.emailModel} 
                  onValueChange={(value) => 
                    setSettings({ ...settings, emailModel: value })
                  }
                >
                  <SelectTrigger id="email-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude-3-5-sonnet-20241022">
                      Claude 3.5 Sonnet (Recommended)
                    </SelectItem>
                    <SelectItem value="gpt-4-turbo-preview">
                      GPT-4 Turbo
                    </SelectItem>
                    <SelectItem value="gpt-3.5-turbo">
                      GPT-3.5 Turbo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-temp">Temperature</Label>
                  <Input
                    id="email-temp"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.emailTemperature}
                    onChange={(e) => 
                      setSettings({ 
                        ...settings, 
                        emailTemperature: parseFloat(e.target.value) 
                      })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    0 = focused, 1 = creative
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-tokens">Max Tokens</Label>
                  <Input
                    id="email-tokens"
                    type="number"
                    min="500"
                    max="8000"
                    step="500"
                    value={settings.emailMaxTokens}
                    onChange={(e) => 
                      setSettings({ 
                        ...settings, 
                        emailMaxTokens: parseInt(e.target.value) 
                      })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Maximum response length
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Generation Settings</CardTitle>
              <CardDescription>
                Configure automated blog post generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="blog-enabled">Enable Blog Generation</Label>
                  <p className="text-sm text-gray-500">
                    Automatically generate blog posts on schedule
                  </p>
                </div>
                <Switch
                  id="blog-enabled"
                  checked={settings.blogGenerationEnabled}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, blogGenerationEnabled: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-schedule">Generation Schedule</Label>
                <Select 
                  value={settings.blogSchedule} 
                  onValueChange={(value) => 
                    setSettings({ ...settings, blogSchedule: value })
                  }
                >
                  <SelectTrigger id="blog-schedule">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0 9 * * 1">Weekly (Monday 9am)</SelectItem>
                    <SelectItem value="0 9 * * 1,4">Twice Weekly (Mon & Thu)</SelectItem>
                    <SelectItem value="0 9 1 * *">Monthly (1st of month)</SelectItem>
                    <SelectItem value="0 9 1,15 * *">Bi-monthly (1st & 15th)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-words">Target Word Count</Label>
                <Select 
                  value={settings.blogWordCount.toString()} 
                  onValueChange={(value) => 
                    setSettings({ ...settings, blogWordCount: parseInt(value) })
                  }
                >
                  <SelectTrigger id="blog-words">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="600">~600 words (Short)</SelectItem>
                    <SelectItem value="800">~800 words (Medium)</SelectItem>
                    <SelectItem value="1000">~1000 words (Standard)</SelectItem>
                    <SelectItem value="1200">~1200 words (Long)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="blog-model">AI Model</Label>
                <Select 
                  value={settings.blogModel} 
                  onValueChange={(value) => 
                    setSettings({ ...settings, blogModel: value })
                  }
                >
                  <SelectTrigger id="blog-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude-3-5-sonnet-20241022">
                      Claude 3.5 Sonnet (Recommended)
                    </SelectItem>
                    <SelectItem value="gpt-4-turbo-preview">
                      GPT-4 Turbo
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your AI provider API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertDescription>
                  API keys are encrypted and stored securely. Only enter new keys if you need to update them.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-api03-..."
                  value={settings.anthropicKey}
                  onChange={(e) => 
                    setSettings({ ...settings, anthropicKey: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Required for Claude models
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={settings.openaiKey}
                  onChange={(e) => 
                    setSettings({ ...settings, openaiKey: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Optional - for GPT models
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-key">Google AI API Key</Label>
                <Input
                  id="google-key"
                  type="password"
                  placeholder="AIza..."
                  value={settings.googleKey}
                  onChange={(e) => 
                    setSettings({ ...settings, googleKey: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Optional - for Gemini models
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        {saveMessage && (
          <Alert className="flex-1 mr-4">
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}