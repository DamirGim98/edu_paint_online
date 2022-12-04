import React from 'react'
import Toolbar from '../components/Toolbar'
import Canvas from '../components/Canvas'
import Chat from '../components/Chat'

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
