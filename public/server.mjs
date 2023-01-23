import express from "express"
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
const app = express()
const server = createServer(app)
const clients = {}

const wss = new WebSocketServer({ server })

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4()
}

wss.on('connection', (ws) => {
    let userID = getUniqueID()
    clients[userID] = ws
    console.log((new Date()) + ' WS origin: ' + userID)

    ws.send('Welcome New Client!')

    ws.on('message', (data) => {
        console.log('received:', JSON.parse(data).message)
        wss.clients.forEach((ws) => ws.send(JSON.parse(data).message))
        // wss.clients.forEach(function each(client) { if (client !== ws && client.readyState === WebSocket.OPEN) client.send(message) })
    })
})

app.get('/', (req, res) => res.send('Server is up!'))
server.listen(5000, '0.0.0.0', () => console.log(`Lisening on port: 5000`))
