import React, { useEffect, useRef } from 'react'
import '../../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import Controller from './Controller'

const Canvas = observer(() => {
  const canvasRef = useRef()

  useEffect(() => {
    Controller.initializeCanvas(canvasRef.current)
    const unsubscribe = Controller.subscribeForMessages()

    return () => unsubscribe()
  }, [])

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  )
})

export default Canvas
