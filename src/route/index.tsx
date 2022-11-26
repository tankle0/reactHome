import { lazy } from "react";
import { createBrowserRouter,Navigate } from "react-router-dom";
import ErrorPage from "@/pages/error";
import Home from "@/pages/home";
import Login from "@/pages/login";

// 使用懒加载的页面
const Dashboard = lazy(() => import('@/pages/dashboard'))
const User = lazy(() => import('@/pages/system/user'))
const Role = lazy(() => import('@/pages/system/role'))

const router  = [
  {
    path:'/',
    element: <Navigate to="/dashboard" /> ,
  },
  {
    path:'/dashboard',
    element: <Home /> ,
    children:[
      {
        path:'',
        element: <Dashboard />
      }
    ],
  },
  {
    path:'/system',
    element: <Home /> ,
    children:[
      {
        path:'user',
        element: <User />
      },
      {
        path:'role',
        element: <Role />
      }
    ],
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'*',
    element: <ErrorPage />,
  },
]


export default router