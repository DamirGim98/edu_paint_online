import React, { useEffect } from 'react'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import PropTypes from 'prop-types'
import UserStore from '../feauture/chat/UserStore'

const Notifications = observer(({ children }) => {
  const [api, contextHolder] = notification.useNotification()
  const currentUser = UserStore.getUsername
  const notificationIncoming = UserStore.getNotification()

  const openNotification = (name) => {
    api.info({
      message: `We have a notification for you!`,
      description: `${name}, just joined your session!`,
      placement: 'bottomLeft',
      icon: <SmileOutlined style={{ color: 'black' }} />,
    })
  }

  useEffect(() => {
    if (notificationIncoming && currentUser !== notificationIncoming.username)
      openNotification(notificationIncoming.username)
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
