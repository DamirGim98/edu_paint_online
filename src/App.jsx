import './styles/app.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import CanvasPage from './pages/CanvasPage'

const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to={`${uuid()}`} />} />
      <Route path="/:id" element={<CanvasPage />} />
    </Routes>
  )
}

export default App
