import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ onClick, isActive, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`toolbar__btn ${isActive && 'pressed'}`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default Button
