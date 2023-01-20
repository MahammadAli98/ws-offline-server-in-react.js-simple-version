import express from "express"
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
const app = express()
const server = createServer(app)
const clients = {}

const wss = new WebSocketServer({ server: server })

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4()
}

wss.on('connection', function connection(ws) {

    let userID = getUniqueID()
    console.log((new Date()) + ' Recieved a new connection from origin ' + ws.origin + '.')

    clients[userID] = ws
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
    console.log('A new client Connected! ' + userID)

    ws.send('Welcome New Client!')

    ws.on('message', function incoming(message) {
        console.log('received: %s', message)
        wss.clients.forEach(function each(client) { if (client !== ws && client.readyState === WebSocket.OPEN) client.send(message) })
    })
})

app.get('/', (req, res) => res.send('Hello World!'))
server.listen(5000, () => console.log(`Lisening on port :5000`))