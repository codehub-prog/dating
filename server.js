const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT;// || 8080;

// Create HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Server is running 🚀");
});

// Attach WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        ws.send(message.toString());
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// 🚨 VERY IMPORTANT: listen on Railway port
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
