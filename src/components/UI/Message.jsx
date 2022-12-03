import React, { memo } from 'react'
import PropTypes from 'prop-types'
import '../../styles/message.scss'

const Message = ({ message, username }) => {
  return (
    <div className={message.username === username ? `message` : `message-from`}>
      {message.text}
      <p className="message__time">{message.time}</p>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.objectOf(PropTypes.string).isRequired,
  username: PropTypes.string.isRequired,
}

const memoizedMessage = memo(Message)

export default memoizedMessage
