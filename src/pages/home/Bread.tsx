import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { breadType } from "@/types/home";

const Bread:React.FC<{breadArr:Array<breadType>}> = ({breadArr}) => {
  return (
    <Breadcrumb>
      {
        breadArr.map((bread,index) => {
        return (
          <Breadcrumb.Item key={bread.path}>
            {
              index === breadArr.length - 1 ? bread.name :
              <Link to={bread.path}>
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