import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './pages/App.jsx'
import AnjuTestPage from './pages/Anju.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/anju" element={<AnjuTestPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
