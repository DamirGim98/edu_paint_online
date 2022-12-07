import React, { useState } from 'react'
import {
  EditOutlined,
  BorderOutlined,
  UndoOutlined,
  RedoOutlined,
  ClearOutlined,
  SaveOutlined,
  LineOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'

import { v4 as uuid } from 'uuid'
import toolCreators from '../../../helpers/toolCreators'

import '../../../styles/toolbar.scss'
import Button from './Button'
import WidthSlider from './WidthSlider'
import canvasState from '../canvasState'
import CopyToClipboard from './CopyToClipboard'
import Controller from '../Controller'

const Icons = [
  <EditOutlined />,
  <BorderOutlined />,
  <LineOutlined />,
  <PlusCircleOutlined />,
  <ClearOutlined />,
]

const Toolbar = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const handleClick = (index, callback) => {
    setActiveIndex(index)
    callback()
  }

  const handleColorChange = (event) => {
    Controller.setDrawingColors(event.target.value)
  }

  const downloadImage = () => {
    const dataUrl = canvasState.canvas.toDataURL()
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'NewImage.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="toolbar">
      {Icons.map((icon, index) => {
        return (
          <Button
            key={uuid()}
            onClick={() => handleClick(index, toolCreators[index])}
            isActive={activeIndex === index}
          >
            {icon}
          </Button>
        )
      })}
      <input
        onChange={handleColorChange}
        className="toolbar__color"
        type="color"
      />
      <WidthSlider />
      <div className="toolbar__divider" />
      <CopyToClipboard />
      <UndoOutlined
        onClick={() => canvasState.undo()}
        className="toolbar__btn"
      />
      <RedoOutlined
        onClick={() => canvasState.redo()}
        className="toolbar__btn"
      />
      <SaveOutlined onClick={downloadImage} className="toolbar__btn" />
    </div>
  )
}

export default Toolbar
