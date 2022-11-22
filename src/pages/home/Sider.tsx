import React from "react";
import { Layout, Menu, } from "antd";
import { menuType } from "@/types/home";

const { Sider } = Layout;

const Siders:React.FC<{collapsed: boolean,menu:Array<menuType>}> = ({collapsed,menu}) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={['1']}
        selectedKeys={['1-1']}
        items={menu}
      />
    </Sider>
  )
}

export default Siders