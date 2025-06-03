const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const PORT = 3002
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const hostname = "127.0.0.1"
const corsOption = {
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:3001"
    ]
}

app.use(cors(corsOption))
app.use(bodyParser.json())
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`RECEIVED: ${message}`)
    })

    ws.on('close', () => console.log('Web Socket disconnected'))
})

app.post("/send-message",
    cors(corsOption),
    (req, res) => {
        const { name, message } = req.body

        if (!name || !message) {
            return res.status(422).json({
                message: "name and message must be filled!"
            })
        }

        try {
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.open) {
                    client.send(JSON.stringify({ name, message }))
                }
            });

            res.json({
                success: true,
                message: 'Chat has send successfully!',
                contentMessage: message,
                name: name
            })
        } catch (error) {
            console.log(`Error sending notif: ${error}`)
            res.status(500).json({
                message: "ERR",
                error: error
            })
        }
    })

server.listen(PORT, () => console.log(`WEB SERVER START at http://${hostname}:${PORT}`))