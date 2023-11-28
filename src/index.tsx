import Auth from './pages/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainWindow from './pages/main_window'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/noauth" element={<Auth />} />
        <Route path="/" element={<MainWindow />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
