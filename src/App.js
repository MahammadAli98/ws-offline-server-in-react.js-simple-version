import { useEffect, useState } from 'react'

const client = new WebSocket('ws://localhost:5000/ws/chat/')

export default function App() {

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])


  const sntbtn = (msg) => {
    client.send(JSON.stringify({ type: 'message', message: msg }))
    setMessages([...messages, msg])
    console.log('sent messages: ' + messages)
    setMessage('')
  }

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected' + client.readyState)
    }
    client.onmessage = (message) => {
      const dataFromServer = JSON.stringify(message.data)
      console.log('got reply! ', dataFromServer)
    }
  })


  return (
    <div className="App">
      <h1>React App</h1>
      <input type="text"
        placeholder="Enter your message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sntbtn(message)}>sent message</button>
    </div>
  )
}