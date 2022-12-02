import React, { useState, useRef, useEffect } from 'react'
import { Modal, Input } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import WebSocketApi from '../../store/WebSocketApi'
import Methods from '../../helpers/Connections'

const UsernameModal = () => {
  const usernameRef = useRef(null)
  const [open, setOpen] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  const handleUsernameSubmit = () => {
    const username = usernameRef.current.input.value
    WebSocketApi.setUsername = username
    WebSocketApi.sessionId = id
    WebSocketApi.getSocket.onopen = () => {
      // eslint-disable-next-line no-console
      console.log('Connection established')
      WebSocketApi.getSocket.send(
        JSON.stringify({
          id,
          username,
          method: Methods.connection,
        })
      )
    }
    navigate('canvas')
    setOpen(false)
  }

  useEffect(() => {})

  return (
    <Modal
      title="Enter your username"
      centered
      open={open}
      onOk={handleUsernameSubmit}
      onCancel={() => setOpen(false)}
      width={300}
      destroyOnClose
    >
      <Input ref={usernameRef} />
    </Modal>
  )
}

export default UsernameModal
