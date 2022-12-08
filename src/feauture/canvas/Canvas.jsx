import React, { useEffect, useRef } from 'react'
import '../../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import Controller from './Controller'
import canvasState from './canvasState'

const Canvas = observer(() => {
  const canvasRef = useRef()
  const isCanvasBlocked = canvasState.CanvasState

  useEffect(() => {
    Controller.initializeCanvas(canvasRef.current)
    const unsubscribe = Controller.subscribeForMessages()

    return () => unsubscribe()
  }, [])

  return (
    <div className="canvas">
      <div style={{ position: 'relative' }}>
        {isCanvasBlocked && (
          <div className="canvas__blocked">Your friend is drawing! :)</div>
        )}
      </div>
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  )
})

export default Canvas
