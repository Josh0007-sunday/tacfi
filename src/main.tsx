import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import LandingPage from './components/LandingPage'

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)
