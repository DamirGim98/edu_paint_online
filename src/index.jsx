import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import StylesOverrideProvider from './components/ConfigProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <StylesOverrideProvider>
      <App />
    </StylesOverrideProvider>
  </React.StrictMode>
)
