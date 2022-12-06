import './styles/app.scss'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import CanvasPage from './pages/CanvasPage'
import UsernameModal from './feauture/canvas/UI/UsernameModal'
import MessagesController from './feauture/chat/MessagesController'

const App = () => {
  useEffect(() => {
    MessagesController.startConnection()
  }, [])

  return (
    <Routes>
      <Route path="/">
        <Route index element={<UsernameModal />} />
        <Route path="canvas" element={<CanvasPage />} />
      </Route>
    </Routes>
  )
}

export default App
