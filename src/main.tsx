import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import 'normalize.css'
import './index.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* basename与vite中的配置的base一致 */}
    <BrowserRouter basename='/reactHome/'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
