import './styles/app.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import CanvasPage from './pages/CanvasPage'
import UsernameModal from './components/UI/UsernameModal'

const App = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to={`${uuid()}`} />} />
      <Route path="/:id">
        <Route index element={<UsernameModal />} />
        <Route path="canvas" element={<CanvasPage />} />
      </Route>
    </Routes>
  )
}

export default App
