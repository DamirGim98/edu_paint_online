import React from 'react'
import Toolbar from '../feauture/canvas/Toolbar'
import Canvas from '../feauture/canvas/Canvas'
import Chat from '../feauture/chat/Chat'

import '../styles/app.scss'
import Notifications from '../components/Notifications'

const CanvasPage = () => {
  return (
    <div className="App">
      <Notifications>
        <Toolbar />
        <div className="wrapper">
          <Canvas />
          <Chat />
        </div>
      </Notifications>
    </div>
  )
}

export default CanvasPage
