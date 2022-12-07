import React from 'react'
import '../styles/reconnect.scss'
import Controller from '../feauture/chat/Controller'

const ReconnectGroup = () => {
  const handleClick = () => {
    Controller.startConnection()
    setTimeout(() => {
      Controller.sendWebsocketMessage({
        method: 'connection',
      })
    }, 3000)
  }

  return (
    <div className="reconnect">
      <h1>Connection is temporarily lost</h1>
      <button className="reconnect__button" type="button" onClick={handleClick}>
        Try to reconnect
      </button>
    </div>
  )
}

export default ReconnectGroup
