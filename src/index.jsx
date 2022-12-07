import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import StylesOverrideProvider from './components/ConfigProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StylesOverrideProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StylesOverrideProvider>
)
