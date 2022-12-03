import React from 'react'
import Toolbar from '../components/Toolbar'
import Canvas from '../components/Canvas'
import Chat from '../components/Chat'

import '../styles/app.scss'

const CanvasPage = () => {
  return (
    <div className="App">
      <Toolbar />
      <div className="wrapper">
        <Canvas />
        <Chat />
      </div>
    </div>
  )
}

export default CanvasPage
