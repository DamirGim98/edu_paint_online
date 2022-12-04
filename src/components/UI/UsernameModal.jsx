import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Modal, Input, Form, Checkbox, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../../store/WebSocketApi'
import Methods from '../../helpers/Connections'

const UsernameModal = observer(() => {
  const usernameRef = useRef(null)
  const [form] = Form.useForm()
  const [open, setOpen] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    let id
    const values = form.getFieldsValue()
    WebSocketApi.setUsername = values.username
    if (!isGuest) {
      id = uuid()
    } else {
      id = values.id
    }
    WebSocketApi.setSessionId = id
    WebSocketApi.getSocket.onopen = () => {
      WebSocketApi.getSocket.send(
        JSON.stringify({
          id,
          username: values.username,
          method: Methods.connection,
        })
      )
    }
    navigate('canvas')
    setOpen(false)
  }

  const handleCheckbox = () => {
    setIsGuest(!isGuest)
    WebSocketApi.setGuest = !isGuest
  }

  useEffect(() => {
    usernameRef.current.focus()
  })

  return (
    <Modal
      title="Enter your username"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={300}
      destroyOnClose
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        size="middle"
        style={{ paddingTop: '20px' }}
      >
        <Form.Item name="username">
          <Input ref={usernameRef} placeholder="Username" />
        </Form.Item>
        <Form.Item name="guest" valuePropName="checked">
          <Checkbox onChange={handleCheckbox}>
            I want to join existing session
          </Checkbox>
        </Form.Item>
        {isGuest && (
          <Form.Item name="id">
            <Input placeholder="Enter session id" />
          </Form.Item>
        )}
        <Form.Item
          wrapperCol={{ offset: 15, span: 16 }}
          style={{ marginBottom: '0px' }}
        >
          <Button onClick={handleSubmit} type="primary">
            Lets Draw!
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default UsernameModal
