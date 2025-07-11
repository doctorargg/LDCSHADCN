import { NextRequest, NextResponse } from 'next/server';
import { BlogNotificationService } from '@/lib/services/blog-notification';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const action = searchParams.get('action') as 'approve' | 'reject';

    if (!token || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    const result = await BlogNotificationService.processApproval(token, action);

    // Return a simple HTML page with the result
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blog Post ${action === 'approve' ? 'Approved' : 'Rejected'}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
          }
          .success {
            color: #22c55e;
          }
          .reject {
            color: #ef4444;
          }
          h1 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
          p {
            color: #666;
            margin: 0 0 1.5rem 0;
          }
          a {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #4B7C4B;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
          }
          a:hover {
            background-color: #3d643d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="${action === 'approve' ? 'success' : 'reject'}">
            Blog Post ${action === 'approve' ? 'Approved' : 'Rejected'}
          </h1>
          <p>
            "${result.postTitle}" has been ${action === 'approve' ? 'approved and published' : 'rejected'}.
            ${action === 'approve' ? 'Email notifications have been sent to subscribers.' : ''}
          </p>
          <a href="/admin/ai/blog">Go to Admin Dashboard</a>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error processing approval:', error);
    
    // Return error HTML page
    const errorHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
          }
          h1 {
            color: #ef4444;
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
          p {
            color: #666;
            margin: 0 0 1.5rem 0;
          }
          a {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background-color: #4B7C4B;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
          }
          a:hover {
            background-color: #3d643d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Error</h1>
          <p>
            ${error instanceof Error ? error.message : 'An error occurred while processing your request.'}
          </p>
          <a href="/admin/ai/blog">Go to Admin Dashboard</a>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(errorHtml, {
      status: 400,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
}