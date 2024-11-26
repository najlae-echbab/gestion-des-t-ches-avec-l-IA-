import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "tailwindcss/tailwind.css";
import "./index.css";

import App from './App'
import AppRouter from './AppRouter'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
