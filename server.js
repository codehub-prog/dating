const http = require('http');
const WebSocket = require('ws');

const port = process.env.PORT || 8080;

// Create HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("WebSocket server is running");
});

// Attach WebSocket to HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());

        // Echo back
        ws.send(message.toString());
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
