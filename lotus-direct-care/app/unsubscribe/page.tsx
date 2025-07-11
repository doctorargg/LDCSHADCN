import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>Unsubscribe from Newsletters</CardTitle>
          <CardDescription>
            We're sorry to see you go. You can manage your email preferences below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            To unsubscribe from our newsletters, please contact us at{' '}
            <a href="mailto:info@lotusdirectcare.com" className="text-lotus-primary hover:underline">
              info@lotusdirectcare.com
            </a>{' '}
            or call us at (949) 338-4388.
          </p>
          <p className="text-sm text-gray-600">
            You can also manage your preferences when you next visit our office.
          </p>
          <div className="flex flex-col gap-2 pt-4">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}