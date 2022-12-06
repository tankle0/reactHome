import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import 'normalize.css'
import './index.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    {/* basename与vite中的配置的base一致 */}
    {/* <BrowserRouter basename='/reactHome/'>
      <App />
    </BrowserRouter> */}
    {/* 部署到github需使用hash模式，解决刷新404 */}
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
