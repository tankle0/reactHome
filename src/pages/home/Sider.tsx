import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, } from "antd";
import { menuType } from "@/types/home";
import type { MenuProps } from 'antd';
import { getMenu } from "@/utils";
import { useAppSelector, useAppDispatch } from '@/hooks';

const { Sider } = Layout;

const Siders:React.FC<{collapsed:boolean,menu:Array<menuType>}> = ({collapsed,menu}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let { pathname } = useLocation()
  const { currentPathname, openKeys } = useAppSelector((state) => state.home)
  pathname = currentPathname || pathname
  const defaultOpenKeys = [getMenu(pathname,menu).path]

  // 子菜单点击事件
  const menuClick:MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }
  // 父级菜单展开/关闭事件,设置只能展开一项菜单
  const openMenu:MenuProps['onOpenChange'] = (openKeys) => {
    let keys = openKeys.length > 1 ? [openKeys[openKeys.length - 1]] : openKeys
    dispatch({type:'home/updateState',payload:{openKeys:keys}})
  }
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        openKeys={openKeys}
        onOpenChange={openMenu}
        onClick={menuClick}
        items={menu}
      />
    </Sider>
  )
}

export default Siders