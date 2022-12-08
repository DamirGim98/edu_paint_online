import React, { useState } from 'react'
import { Slider } from 'antd'
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
      <div className="slider__number">{inputValue}</div>
    </div>
  )
}

export default WidthSlider
