import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Toolbar from '../feauture/canvas/UI/Toolbar'
import Canvas from '../feauture/canvas/Canvas'
import Chat from '../feauture/chat/Chat'

import '../styles/app.scss'
import Notifications from '../components/Notifications'
import Controller from '../feauture/chat/Controller'
import WebSocketApi from '../api/WebSocketApi'
import ReconnectGroup from '../components/ReconnectGroup'

const CanvasPage = observer(() => {
  const isSocketWorking = WebSocketApi.socketState !== 'error'
  useEffect(() => {
    const unsubscribe = Controller.subscribeForMessages()

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = Controller.listenForErrors()

    return () => unsubscribe()
  }, [])

  return (
    <div className="App">
      <Notifications>
        <Toolbar />
        <div className="wrapper">
          {isSocketWorking ? (
            <>
              <Canvas />
              <Chat />
            </>
          ) : (
            <ReconnectGroup />
          )}
        </div>
      </Notifications>
    </div>
  )
})

export default CanvasPage
