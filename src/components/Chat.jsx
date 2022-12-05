import React, { useState } from 'react'
import '../styles/chat.scss'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../store/WebSocketApi'
import SendMessageForm from './UI/SendMessageForm'
import Message from './UI/Message'
import useChatScroll from '../hooks/useChatScroll'

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
        {messages.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Message username={username} message={message} key={index} />
        ))}
      </div>

      <SendMessageForm />
    </div>
  )
})

export default Chat
