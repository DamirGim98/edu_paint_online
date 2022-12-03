import React, { useState } from 'react'
import '../styles/chat.scss'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../store/WebSocketApi'

const Chat = observer(() => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])
  const username = WebSocketApi.getUsername

  const handleSubmit = () => {
    WebSocketApi.getSocket.send(
      JSON.stringify({
        method: 'text',
        id: WebSocketApi.getSessionId,
        username,
        text,
      })
    )
    setText('')
  }

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
      <div className="chat__controls">
        <input
          type="text"
          value={text}
          className="chat__input"
          onChange={(e) => setText(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button onClick={handleSubmit} type="button" className="chat__button">
          Send
        </button>
      </div>
    </div>
  )
})

export default Chat
