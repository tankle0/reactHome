import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, } from "antd";
import { menuType } from "@/types/home";
import type { MenuProps } from 'antd';
import { getParentKey } from "@/utils";

const { Sider } = Layout;

const Siders:React.FC<{collapsed:boolean,menu:Array<menuType>}> = ({collapsed,menu}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const defaultOpenKeys = [getParentKey(pathname,menu)]
  const menuClick:MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        onClick={menuClick}
        items={menu}
      />
    </Sider>
  )
}

export default Siders