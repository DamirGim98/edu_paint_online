import React, { useEffect, useState } from 'react'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import WebSocketApi from '../store/WebSocketApi'

const Notifications = observer(({ children }) => {
  const [api, contextHolder] = notification.useNotification()
  const [message, setMessage] = useState('')
  const socket = WebSocketApi.getSocket
  const currentUser = WebSocketApi.getUsername

  const openNotification = (name) => {
    api.info({
      message: `We have a notification for you!`,
      description: `${name}, just joined your session!`,
      placement: 'bottomLeft',
      icon: <SmileOutlined style={{ color: 'black' }} />,
    })
  }

  useEffect(() => {
    if (message) openNotification(message)
  }, [message])

  socket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    if (msg.method === 'connection' && msg.username !== currentUser) {
      setMessage(msg.username)
    }
  })

  return (
    <>
      {contextHolder}
      {children}
    </>
  )
})

Notifications.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
}

export default Notifications
