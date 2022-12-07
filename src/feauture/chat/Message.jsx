import React, { memo } from 'react'
import PropTypes from 'prop-types'
import '../../styles/message.scss'

const Message = ({ message, username }) => {
  return (
    <div className={message.username === username ? `message` : `message-from`}>
      <div className="message__text">{message.text}</div>
      <div className="message__stamp">
        <p className="message__time">{message.time}</p>
        <p className="message__name">{message.username}</p>
      </div>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
}

const memoizedMessage = memo(Message)

export default memoizedMessage
