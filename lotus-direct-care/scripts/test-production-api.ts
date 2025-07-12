import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const ADMIN_API_KEY = process.env.ADMIN_API_KEY!;
const PRODUCTION_URL = 'https://lotusdirectcare.com'; // Update this if different

async function testEndpoint(endpoint: string, method: string = 'GET') {
  console.log(`\nTesting ${method} ${endpoint}...`);
  
  try {
    const response = await fetch(`${PRODUCTION_URL}${endpoint}`, {
      method,
      headers: {
        'x-admin-token': ADMIN_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✓ Success:', response.status);
      console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500) + '...');
    } else {
      console.log('✗ Error:', response.status);
      console.log('Response:', data);
    }
  } catch (error) {
    console.log('✗ Failed:', error);
  }
}

async function runTests() {
  console.log('Testing Production API Endpoints');
  console.log('================================');
  console.log(`Production URL: ${PRODUCTION_URL}`);
  console.log(`Admin API Key: ${ADMIN_API_KEY ? 'Set' : 'Not Set'}`);

  // Test diagnostic endpoint
  await testEndpoint('/api/admin/research/diagnostic');
  
  // Test research sources
  await testEndpoint('/api/admin/research/sources');
  
  // Test research queries
  await testEndpoint('/api/admin/research/queries');
  
  // Test research history
  await testEndpoint('/api/admin/research/history');
}

runTests()
  .then(() => {
    console.log('\nAll tests completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });