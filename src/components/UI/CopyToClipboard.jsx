import React, { useState } from 'react'
import '../../styles/copy.scss'
import { CopyOutlined, CheckOutlined, ArrowUpOutlined } from '@ant-design/icons'

const CopyToClipboard = () => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
    let link = window.location.href.split('/')
    link.pop()
    link = link.join('/')
    navigator.clipboard.writeText(link)
  }

  return (
    <button type="button" className="copy" onClick={handleClick}>
      <div className="copy__text">
        {isClicked ? 'Copied!' : 'Copy session link'}
      </div>
      {isClicked ? (
        <CheckOutlined style={{ color: 'green' }} />
      ) : (
        <CopyOutlined />
      )}
      {!isClicked && <ArrowUpOutlined className="copy__pointer" />}
    </button>
  )
}

export default CopyToClipboard
