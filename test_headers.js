
const API_URL = "https://lnfrp.onrender.com";

const getHeaders = () => {
    const headers = {
        'Content-Type': 'application/json',
    };
    // Simulate no token for now, or add a fake one
    // const token = localStorage.getItem('token');
    // if (token) {
    //     headers['Authorization'] = `Bearer ${token}`;
    // }
    return headers;
};

async function testConnection() {
    try {
        console.log(`Testing connection to ${API_URL}/items with headers...`);
        const response = await fetch(`${API_URL}/items`, {
            method: 'GET',
            headers: getHeaders(),
        });
        console.log(`Status: ${response.status}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Data received:', JSON.stringify(data).slice(0, 100) + '...');
        } else {
            const text = await response.text();
            console.log('Response not OK:', text);
        }
    } catch (error) {
        console.error('Error connecting:', error.message);
        if (error.cause) console.error('Cause:', error.cause);
    }
}

testConnection();
