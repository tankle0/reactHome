import { createBrowserRouter,Navigate } from "react-router-dom";
import Login from '../pages/login';
import ErrorPage from "../pages/error";
import App from "../App";
import Dashboard from "@/pages/dashboard";
import System from "@/pages/system";

const router  = createBrowserRouter([
  {
    path:'/',
    element: <Navigate to="/dashboard" /> ,
    errorElement: <ErrorPage />,
    children:[],
  },
  {
    path:'/dashboard',
    element: <App /> ,
    children:[
      {
        path:'',
        element: <Dashboard />
      }
    ],
  },
  {
    path:'/system',
    element: <App /> ,
    children:[
      {
        path:'',
        element: <System />
      }
    ],
  },
  {
    path:'/login',
    element: <Login />
  },
])


export default router