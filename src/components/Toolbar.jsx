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

import toolCreators from '../helpers/toolCreators'

import '../styles/toolbar.scss'
import Button from './UI/Button'
import WidthSlider from './UI/WidthSlider'
import toolState from '../store/toolState'
import canvasState from '../store/canvasState'

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
    toolState.setFillColor(event.target.value)
    toolState.setStrokeColor(event.target.value)
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
      <UndoOutlined
        onClick={() => canvasState.undo()}
        className="toolbar__btn toolbar__undo"
      />
      <RedoOutlined
        onClick={() => canvasState.redo()}
        className="toolbar__btn"
      />
      <SaveOutlined className="toolbar__btn" />
    </div>
  )
}

export default Toolbar
