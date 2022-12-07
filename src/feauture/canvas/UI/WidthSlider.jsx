import React, { useState } from 'react'
import { InputNumber, Slider } from 'antd'
import Controller from '../Controller'
import '../../../styles/slider.scss'

const WidthSlider = () => {
  const [inputValue, setInputValue] = useState(1)
  const onChange = (newValue) => {
    setInputValue(newValue)
    Controller.setDrawingWidth(newValue)
  }
  return (
    <div className="slider-wrapper">
      <Slider
        className="slider__selector"
        min={1}
        max={40}
        onChange={onChange}
        value={typeof inputValue === 'number' ? inputValue : 0}
      />
      <InputNumber
        readOnly
        className="slider__number"
        min={1}
        max={40}
        style={{
          margin: '0 16px',
        }}
        value={inputValue}
        onChange={onChange}
      />
    </div>
  )
}

export default WidthSlider
