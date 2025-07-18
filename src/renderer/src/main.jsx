import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './pages/App.jsx'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Settings from './pages/Settings.jsx'

const Router = import.meta.env.DEV ? BrowserRouter : HashRouter
createRoot(document.getElementById('main')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
