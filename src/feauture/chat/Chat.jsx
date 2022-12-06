import React, { useState } from 'react'
import '../../styles/chat.scss'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../../api/WebSocketApi'
import SendMessageForm from './SendMessageForm'
import Message from './Message'
import useChatScroll from '../../hooks/useChatScroll'

const Chat = observer(() => {
  const [messages, setMessages] = useState([])
  const username = WebSocketApi.getUsername
  const ref = useChatScroll(messages)

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
      <div ref={ref} className="chat__messenger">
        {messages.map((message) => (
          <Message
            username={username}
            message={message}
            key={message.text + message.time}
          />
        ))}
      </div>

      <SendMessageForm />
    </div>
  )
})

export default Chat
