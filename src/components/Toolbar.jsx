import React from 'react'
import {
  EditOutlined,
  BorderOutlined,
  UndoOutlined,
  RedoOutlined,
  ClearOutlined,
  SaveOutlined,
  LineOutlined,
  PlusSquareFilled,
  PlusCircleOutlined,
} from '@ant-design/icons'
import toolState from '../store/toolState'
import canvasState from '../store/canvasState'

import '../styles/toolbar.scss'
import Brush from '../tools/Brush'
import Rectangle from '../tools/Rectangle'
import Circle from '../tools/Circle'
import LineTo from '../tools/LineTo'

const Toolbar = () => {
  return (
    <div className="toolbar">
      <EditOutlined
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      />
      <BorderOutlined
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Rectangle(canvasState.canvas))}
      />
      <LineOutlined
        className="toolbar__btn"
        onClick={() => toolState.setTool(new LineTo(canvasState.canvas))}
      />
      <PlusSquareFilled className="toolbar__btn" />
      <PlusCircleOutlined
        className="toolbar__btn"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      />
      <ClearOutlined className="toolbar__btn" />
      <input className="toolbar__color" type="color" />
      <UndoOutlined className="toolbar__btn toolbar__undo" />
      <RedoOutlined className="toolbar__btn" />
      <SaveOutlined className="toolbar__btn" />
    </div>
  )
}

export default Toolbar
