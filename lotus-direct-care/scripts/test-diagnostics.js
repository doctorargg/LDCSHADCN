const fetch = require('node-fetch');

async function testDiagnostics() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/research/diagnostics');
    const data = await response.json();
    console.log('Diagnostics Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

testDiagnostics();