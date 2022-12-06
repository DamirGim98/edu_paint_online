import React, { useEffect, useRef } from 'react'
import '../../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import WebSocketApi from '../../store/WebSocketApi'
import canvasState from './canvasState'
import toolState from './toolState'
import Brush from './tools/Brush'
import Rectangle from './tools/Rectangle'
import Eraser from './tools/Eraser'
import Circle from './tools/Circle'
import LineTo from './tools/LineTo'

const Canvas = observer(() => {
  const canvasRef = useRef()

  const drawHandler = (message) => {
    const { figure } = message
    if (!canvasRef.current) {
      return
    }
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
      case 'eraser':
        Eraser.draw(ctx, figure.x, figure.y, figure.color, figure.width)
        break
      case 'circle':
        Circle.staticDraw(ctx, figure.x, figure.y, figure.r, figure.color)
        break
      case 'line':
        LineTo.staticDraw(
          ctx,
          figure.startX,
          figure.startY,
          figure.x,
          figure.y,
          figure.color,
          figure.width
        )
        break
      default:
        break
    }
  }

  WebSocketApi.getSocket.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data)
    switch (msg.method) {
      case 'draw':
        drawHandler(msg)
        break
      default:
        break
    }
  })

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
