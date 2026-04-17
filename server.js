const WebSocket = require('ws');

const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({
    host: '0.0.0.0',
    port: port
});

let clients = [];

wss.on('connection', (ws, req) => {
    console.log('Client connected:', req.socket.remoteAddress);

    clients.push(ws);

    ws.on('message', (message) => {
        console.log('Received:', message.toString());

        // Broadcast
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(c => c !== ws);
    });
});

console.log(`Server running on port ${port}`);
