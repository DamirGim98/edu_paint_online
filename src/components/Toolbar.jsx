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
      <input className="toolbar__color" type="color" />
      <UndoOutlined className="toolbar__btn toolbar__undo" />
      <RedoOutlined className="toolbar__btn" />
      <SaveOutlined className="toolbar__btn" />
    </div>
  )
}

export default Toolbar
