import React from 'react'
import '../../styles/chat.scss'
import { observer } from 'mobx-react-lite'
import MessagesStore from './MessagesStore'
import SendMessageForm from './SendMessageForm'
import Message from './Message'
import UserStore from './UserStore'
import useChatScroll from '../../hooks/useChatScroll'

const Chat = observer(() => {
  const username = UserStore.getUsername
  const messages = MessagesStore.getList
  const chatRef = useChatScroll(messages.length)

  return (
    <div className="chat">
      <div ref={chatRef} className="chat__messenger">
        {messages.map((message, index) => (
          <Message
            username={username}
            message={message}
            /* eslint-disable-next-line react/no-array-index-key */
            key={index}
          />
        ))}
      </div>

      <SendMessageForm />
    </div>
  )
})

export default Chat
