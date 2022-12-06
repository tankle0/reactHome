import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, } from "antd";
import { menuType } from "@/types/home";
import type { MenuProps } from 'antd';
import { getParentKey } from "@/utils";
import { useAppSelector, useAppDispatch } from '@/hooks'

const { Sider } = Layout;

const Siders:React.FC<{collapsed:boolean,menu:Array<menuType>}> = ({collapsed,menu}) => {
  const navigate = useNavigate()
  let { pathname } = useLocation()
  const { currentPathname } = useAppSelector((state) => state.home)
  pathname = currentPathname || pathname
  const dispatch = useAppDispatch()
  const defaultOpenKeys = [getParentKey(pathname,menu)]
  const menuClick:MenuProps['onClick'] = ({ key }) => {
    dispatch({type:'home/updateState',payload:{currentPathname:key}})
    navigate(key)
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        onClick={menuClick}
        items={menu}
      />
    </Sider>
  )
}

export default Siders