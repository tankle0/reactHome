import React, { ReactElement, useEffect, useState } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAppSelector, useAppDispatch } from './hooks';
import routers from './route';
import { getMenu } from './utils';
import { menu } from './pages/home';
import Login from './pages/login';

/* 
  路由拦截
*/
const BeforeEnterRouter:React.FC = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  let { pathname } = useLocation()
  const Router = useRoutes(routers)
  const { breadArr, currentPathname } = useAppSelector((state) => state.home)
  const dispatch = useAppDispatch()
  pathname = pathname || currentPathname
  let [Routers,setRoute] = useState<ReactElement | null>(null)
  useEffect(() => {
    if(token){
      dispatch({
        type:'home/updateState',
        payload:{
          currentPathname:pathname, // 设置当前选中的菜单
          openKeys:[getMenu(pathname,menu).path], // 设置当前展开的菜单
          breadArr:[breadArr[0]].filter(item => item && item.path !== pathname).concat([getMenu(pathname,menu,true)]) // 设置面包屑
        }
      })
      if(pathname !== '/login'){ // 已登录，去其他页面直接渲染
        setRoute(Router)
        return
      }
      navigate(-1)
    }else{
      if(pathname !== '/login'){ // 没登录，直接去登录页面
        message.open({
          type: 'warning',
          content: '请先进行登录!',
        })
        navigate('/login')
        return
      }
      setRoute(<Login />)
    }
  },[pathname])
  return Routers
}

const App:React.FC = () => {
  return (
    <div className="App">
      <BeforeEnterRouter />
    </div>
  )
}

export default App
