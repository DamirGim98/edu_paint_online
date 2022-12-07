import React, { useRef } from 'react'
import { SendOutlined } from '@ant-design/icons'
import '../../styles/sendMessage.scss'
import Controller from './Controller'

const SendMessageForm = () => {
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = inputRef.current.value
    if (!text) {
      return
    }
    Controller.sendWebsocketMessage({ text, method: 'text' })
    inputRef.current.value = ''
  }

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" className="controls__input" />
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button onClick={handleSubmit} type="submit" className="controls__button">
        <SendOutlined />
      </button>
    </form>
  )
}

export default SendMessageForm
