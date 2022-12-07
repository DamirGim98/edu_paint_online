import React from 'react'
import { ConfigProvider } from 'antd'
import PropTypes from 'prop-types'

const StylesOverrideProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3d3d3d',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

StylesOverrideProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default StylesOverrideProvider
