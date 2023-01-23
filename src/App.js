import { useEffect, useState } from 'react'

const ws = new WebSocket(`ws://${window.location.hostname}:5000`)

export default function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  
  const send = (msg) => {
    ws.send(JSON.stringify({ type: 'message', message: msg }))
    setMessages([...messages, msg])
    setMessage('')
    console.log('sent messages: ' + [...messages, msg])
  }
  
  useEffect(() => {
    ws.onopen = () => console.log('WebSocket Client Connected' + ws.readyState)
    ws.onmessage = (message) => console.log('got reply! ', message.data)
  }, [])


  return (
    <div className="App">
      <h1>React App</h1>
      <input type="text" placeholder="Enter your message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => send(message)}>sent message</button>
    </div>
  )
}
