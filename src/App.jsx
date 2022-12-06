import './styles/app.scss'
import { Routes, Route } from 'react-router-dom'
import CanvasPage from './pages/CanvasPage'
import UsernameModal from './feauture/canvas/UI/UsernameModal'

const App = () => {
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
