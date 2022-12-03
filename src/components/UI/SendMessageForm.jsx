import React, { useState } from 'react'
import { SendOutlined } from '@ant-design/icons'
import WebSocketApi from '../../store/WebSocketApi'
import '../../styles/sendMessage.scss'

const SendMessageForm = () => {
  const [text, setText] = useState('')

  const addZero = (i) => {
    if (i < 10) {
      return `0${i}`
    }
    return i
  }

  const handleSubmit = (e) => {
    let time = new Date()
    time = `${time.getHours()}:${addZero(time.getMinutes())}`
    e.preventDefault()
    WebSocketApi.getSocket.send(
      JSON.stringify({
        method: 'text',
        id: WebSocketApi.getSessionId,
        username: WebSocketApi.getUsername,
        text,
        time,
      })
    )
    setText('')
  }

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        className="controls__input"
        onChange={(e) => setText(e.target.value)}
      />
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button onClick={handleSubmit} type="submit" className="controls__button">
        <SendOutlined />
      </button>
    </form>
  )
}

export default SendMessageForm
