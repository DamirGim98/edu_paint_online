import React, { useState } from 'react'
import '../../../styles/copy.scss'
import { CopyOutlined, CheckOutlined, ArrowUpOutlined } from '@ant-design/icons'
import WebSocketApi from '../../../store/WebSocketApi'

const CopyToClipboard = () => {
  const [isClicked, setIsClicked] = useState(false)
  const [showArrow, setShowArrow] = useState(true)
  const handleClick = () => {
    setIsClicked(true)
    setShowArrow(false)
    navigator.clipboard.writeText(WebSocketApi.getSessionId)
    setTimeout(() => setIsClicked(false), 5000)
  }

  return (
    <button type="button" className="copy" onClick={handleClick}>
      <div className="copy__text">
        {isClicked ? 'Copied!' : 'Copy Identifier'}
      </div>
      {isClicked ? (
        <CheckOutlined style={{ color: 'green' }} />
      ) : (
        <CopyOutlined />
      )}
      {showArrow && <ArrowUpOutlined className="copy__pointer" />}
    </button>
  )
}

export default CopyToClipboard
