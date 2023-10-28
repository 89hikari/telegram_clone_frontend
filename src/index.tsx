import { useState } from 'react'
import Auth from './pages/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/noauth" element={<Auth />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
