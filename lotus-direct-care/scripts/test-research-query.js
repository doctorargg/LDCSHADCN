#!/usr/bin/env node

const queryId = process.argv[2] || '85f597cd-dc9a-47ae-b911-fad0104e9535';
const adminToken = process.env.ADMIN_API_KEY;

if (!adminToken) {
  console.error('ADMIN_API_KEY environment variable is required');
  process.exit(1);
}

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

async function testDebugEndpoint() {
  console.log('Testing debug endpoint...');
  
  try {
    const response = await fetch(`${baseUrl}/api/admin/research/debug?queryId=${queryId}`, {
      headers: {
        'x-admin-token': adminToken
      }
    });
    
    const data = await response.json();
    console.log('\nDebug Response:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Debug endpoint error:', error.message);
  }
}

async function testQueryExecution() {
  console.log('\n\nTesting query execution...');
  
  try {
    const response = await fetch(`${baseUrl}/api/admin/research/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminToken
      },
      body: JSON.stringify({ queryId })
    });
    
    const data = await response.json();
    console.log('\nQuery Execution Response:');
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Query execution error:', error.message);
  }
}

async function main() {
  console.log(`Testing research query with ID: ${queryId}`);
  console.log(`Using base URL: ${baseUrl}`);
  
  await testDebugEndpoint();
  await testQueryExecution();
}

main().catch(console.error);