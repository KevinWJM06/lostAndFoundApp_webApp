
const API_URL = "http://localhost:10000";

async function testConnection() {
    try {
        console.log(`Testing connection to ${API_URL}/items...`);
        const response = await fetch(`${API_URL}/items`);
        console.log(`Status: ${response.status}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Data received:', JSON.stringify(data).slice(0, 100) + '...');
        } else {
            console.log('Response not OK:', await response.text());
        }
    } catch (error) {
        console.error('Error connecting:', error.message);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

testConnection();
