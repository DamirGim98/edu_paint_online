import React, { useState, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import { Modal, Input, Form, Checkbox, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import MessagesController from '../../chat/MessagesController'

const UsernameModal = observer(() => {
  const usernameRef = useRef(null)
  const [form] = Form.useForm()
  const [isChecked, setChecked] = useState(false)
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = () => {
    const { username, isGuest, id: retrievedId } = form.getFieldsValue()

    const sessionId = !isGuest ? uuid() : retrievedId

    MessagesController.setCredentials({ username, isGuest, sessionId })
    MessagesController.sendWebsocketMessage({
      method: 'connection',
    })
    navigate('canvas')
    setOpen(false)
  }

  const handleCheckbox = () => {
    setChecked(!isChecked)
  }

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
        <Form.Item name="isGuest" valuePropName="checked">
          <Checkbox onChange={handleCheckbox}>
            I want to join existing session
          </Checkbox>
        </Form.Item>
        {isChecked && (
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
