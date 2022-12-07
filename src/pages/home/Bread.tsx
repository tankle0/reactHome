import React, { useCallback } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { breadType } from "@/types/home";
import { useAppDispatch } from "@/hooks";

const Bread:React.FC<{breadArr:Array<breadType>}> = ({breadArr}) => {
  const dispatch = useAppDispatch()
  const goTo = useCallback((path:string) => {
    dispatch({type:'home/updateState',payload:{currentPathname:path}})
  },[])
  return (
    <Breadcrumb>
      {
        breadArr.map((bread,index) => {
        return (
          <Breadcrumb.Item key={bread.path}>
            {
              index === breadArr.length - 1 ? bread.name :
              <Link onClick={(event) => goTo(bread.path)} to={bread.path}>
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