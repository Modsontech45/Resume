const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Ensure axios is installed

const app = express();
const PORT = 3000; // You can use any port

// Use CORS middleware
app.use(cors());

// Sample route for testing
app.get('/sensors', (req, res) => {
    res.json({ message: 'Hello from sensors!' });
});

// Route to fetch data from the ESP32
app.get('/esp32/status', async (req, res) => {
    try {
        const esp32Ip = '192.168.137.126'; // Replace with your ESP32 IP
        const response = await axios.get(`http://${esp32Ip}/status`);

        // Log the response data to the console
        console.log('Response from ESP32:', JSON.stringify(response.data, null, 2));

        // Send the response data to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from ESP32:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from ESP32' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
