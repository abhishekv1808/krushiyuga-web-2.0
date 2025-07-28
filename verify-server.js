// Simple verification script to test server status
console.log('🔍 Server Status Verification');
console.log('Current time:', new Date().toISOString());

// Test different endpoints
const http = require('http');

const testEndpoints = [
    { path: '/', name: 'Home Page' },
    { path: '/contact-us', name: 'Contact Page', method: 'GET' },
    { path: '/multi-layer-husbandry', name: 'Multi-layer Page' }
];

async function testEndpoint(endpoint) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: endpoint.path,
            method: endpoint.method || 'GET',
            timeout: 3000
        };

        const req = http.request(options, (res) => {
            console.log(`✅ ${endpoint.name}: ${res.statusCode}`);
            resolve({ success: true, status: res.statusCode });
        });

        req.on('error', (err) => {
            console.log(`❌ ${endpoint.name}: ${err.message}`);
            resolve({ success: false, error: err.message });
        });

        req.on('timeout', () => {
            console.log(`⏰ ${endpoint.name}: Timeout`);
            resolve({ success: false, error: 'timeout' });
        });

        req.end();
    });
}

async function runTests() {
    console.log('\n🧪 Testing server endpoints...');
    
    for (const endpoint of testEndpoints) {
        await testEndpoint(endpoint);
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
    }
    
    console.log('\n📋 Test Summary Complete');
}

runTests();
