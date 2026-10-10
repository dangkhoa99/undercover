import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import './i18n'
import App from './App.tsx'

const ROOT_ID = 'root'

const container = document.getElementById(ROOT_ID)

if (!container) {
  throw new Error(`Missing #${ROOT_ID} element in index.html`)
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
