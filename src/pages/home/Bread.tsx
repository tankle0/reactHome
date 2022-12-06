import React from "react";
import { Breadcrumb } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { breadType } from "@/types/home";
import { useAppDispatch } from "@/hooks";

const Bread:React.FC<{breadArr:Array<breadType>}> = ({breadArr}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const goTo = (event:any,path:string) => {
    console.log(path);
    dispatch({type:'home/updateState',payload:{currentPathname:path}})
    navigate(path)
    event.preventDefault()
  }
  return (
    <Breadcrumb>
      {
        breadArr.map((bread,index) => {
        return (
          <Breadcrumb.Item key={bread.path}>
            {
              index === breadArr.length - 1 ? bread.name :
              <Link onClick={(event) => goTo(event,bread.path)} to={bread.path}>
                {bread.name}
              </Link>
            }
          </Breadcrumb.Item>
        )})
      }
    </Breadcrumb>
  )
}

export default Bread