import React, { useState } from 'react'
import '../styles/chat.scss'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../store/WebSocketApi'
import SendMessageForm from './UI/SendMessageForm'
import Message from './UI/Message'

const Chat = observer(() => {
  const [messages, setMessages] = useState([])
  const username = WebSocketApi.getUsername

  WebSocketApi.getSocket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    switch (msg.method) {
      case 'text':
        setMessages([...messages, msg])
        break
      default:
        break
    }
  })

  return (
    <div className="chat">
      <div className="chat__messenger">
        <div
          style={{
            height: `calc(100% - ${messages.length * 44}px)`,
            width: '100%',
          }}
        />
        {messages.map((message) => (
          <Message username={username} message={message} key={`${uuid()}`} />
        ))}
      </div>
      <SendMessageForm />
    </div>
  )
})

export default Chat
