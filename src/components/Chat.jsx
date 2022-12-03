import React, { useState } from 'react'
import '../styles/chat.scss'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../store/WebSocketApi'
import SendMessageForm from './UI/SendMessageForm'

const Chat = observer(() => {
  const [messages, setMessages] = useState([])
  const username = WebSocketApi.getUsername

  WebSocketApi.getSocket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    // eslint-disable-next-line no-shadow
    const { text, username } = msg
    switch (msg.method) {
      case 'text':
        setMessages([...messages, { text, username }])
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
          <div
            key={`${uuid()}`}
            className={
              message.username === username
                ? `chat__message`
                : `chat__message chat__message_from`
            }
          >
            {message.text}
          </div>
        ))}
      </div>
      <SendMessageForm />
    </div>
  )
})

export default Chat
