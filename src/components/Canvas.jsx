import React, { useEffect, useRef } from 'react'
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../store/WebSocketApi'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rectangle from '../tools/Rectangle'

const Canvas = observer(() => {
  const canvasRef = useRef()

  const drawHandler = (message) => {
    const { figure } = message
    const ctx = canvasRef.current.getContext('2d')
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y, figure.color, figure.width)
        break
      case 'finish':
        ctx.beginPath()
        break
      case 'rectangle':
        Rectangle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        )
        break
      default:
        break
    }
  }

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
