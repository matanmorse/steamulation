import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './pages/Library.jsx'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Settings from './pages/Settings.jsx'
import { EmulatorProvider } from './contexts/SharedContext.jsx'
import { ModalProvider, useModal } from './contexts/ModalContext.jsx'
import ErrorModal from './modals/ErrorModal.jsx'
import Debug from './pages/Debug.jsx'


const Router = import.meta.env.DEV ? BrowserRouter : HashRouter
createRoot(document.getElementById('main')).render(
<Router>
  <ModalProvider>
    <EmulatorProvider>
      <StrictMode>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/debug' element={<Debug />} />
            </Route>
          </Routes>
      </StrictMode>
    </EmulatorProvider>,
  </ModalProvider>
</Router>

)
