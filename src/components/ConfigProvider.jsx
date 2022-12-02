import React from 'react'
import { ConfigProvider } from 'antd'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prop-types
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

// eslint-disable-next-line react/no-typos
StylesOverrideProvider.PropTypes = {
  children: PropTypes.element.isRequired,
}

export default StylesOverrideProvider
