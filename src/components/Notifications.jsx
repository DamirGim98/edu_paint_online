import React, { useEffect } from 'react'
import { notification } from 'antd'
import { SmileOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import UserStore from '../feauture/chat/UserStore'

const Notifications = observer(({ children }) => {
  const [api, contextHolder] = notification.useNotification()
  const currentUser = UserStore.getUsername
  const notificationIncoming = UserStore.getNotification

  const openNotification = (msg) => {
    if (msg.method === 'connection' && msg.username !== currentUser) {
      api.info({
        message: `${currentUser}, we have a msg for you!`,
        description: `${msg.username}, just joined your session!`,
        placement: 'bottomLeft',
        icon: <SmileOutlined style={{ color: 'black' }} />,
      })
    } else if (msg.method === 'error') {
      api.error({
        message: `Connection error occurred`,
        description: `Websocket connection is lost!`,
        placement: 'bottomLeft',
        icon: <ExclamationCircleOutlined style={{ color: 'red' }} />,
        duration: 6,
      })
    }
  }

  useEffect(() => {
    if (notificationIncoming) openNotification(notificationIncoming)
  }, [notificationIncoming])

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
