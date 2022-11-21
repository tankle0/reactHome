import { createBrowserRouter,Navigate } from "react-router-dom";
import Login from '../pages/login';
import ErrorPage from "../pages/error";
import App from "../App";

const router  = createBrowserRouter([
  {
    path:'/',
    element: <Navigate to="/home" /> ,
    errorElement: <ErrorPage />,
    children:[],
  },
  {
    path:'/home',
    element: <App /> ,
    children:[],
  },
  {
    path:'/login',
    element: <Login />
  },
])


export default router