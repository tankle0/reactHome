import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, BrowserRouter } from 'react-router-dom'
import App from './App'
import router from './route'
import 'normalize.css'
import './index.less'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
