import React, { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import routers from './route';
import Login from './pages/login';

/* 
  路由拦截
*/
const EnterRouter:React.FC = () => {
  const token = localStorage.getItem('token')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const Router = useRoutes(routers)
  useEffect(() => {
    if(token){
      if(pathname === '/login'){ // 登录过，还去登录页面，直接跳转之前的页面
        navigate(-1)
        return
      }
    }else{
      if(pathname !== '/login'){ // 没登录，直接去登录页面
        message.config({
          maxCount:1
        })
        message.open({
          type: 'warning',
          content: '请先进行登录!',
        })
        navigate('/login')
      }
    }
  },[])
  if(token){
    if(pathname !== '/login'){
      return Router
    }
    return null
  }
  return <Login />
}
  
const beforeRouteEnter = ():React.ReactNode => {
  return <EnterRouter />
}

const App:React.FC = (props:any) => {
  return (
    <div className="App">
      {beforeRouteEnter()}
    </div>
  )
}

export default App
