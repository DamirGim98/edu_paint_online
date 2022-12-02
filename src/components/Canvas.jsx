import React, { useEffect, useRef } from 'react'
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../store/WebSocketApi'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'

const Canvas = observer(() => {
  const canvasRef = useRef()

  const drawHandler = () => {}

  WebSocketApi.getSocket.onmessage = (event) => {
    const msg = JSON.parse(event.data)
    switch (msg.method) {
      case 'connection':
        // eslint-disable-next-line no-console
        console.log(`User ${msg.username} connected`)
        break
      case 'draw':
        drawHandler(msg)
        break
      default:
        break
    }
  }

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
    toolState.setTool(new Brush(canvasRef.current))
  }, [])

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className="canvas">
      <canvas
        onMouseDown={mouseDownHandler}
        ref={canvasRef}
        width={800}
        height={600}
      />
    </div>
  )
})

export default Canvas
