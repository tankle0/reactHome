import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout, Dropdown, Space } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import Bread from "./Bread";
import Siders from "./Sider";
import styles from "./index.module.less";

const { Header, Content } = Layout;
const menu = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
    children:[{
      key: '1-1',
      icon: <UserOutlined />,
      label: 'nav 1-1',
    }]
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
  },
];
const items: MenuProps['items'] = [
  {
    label: (
      <Link to="/dashboard">
        首页
      </Link>
    ),
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Link to="/system">
        系统设置
      </Link>
    ),
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <a rel="noopener noreferrer" href="#">
        退出登录
      </a>
    ),
    key: '2',
  }
];

const Home:React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          React+TypeScript 后台管理系统模板
        </div>
        <div className={styles.user}>
          <span>欢迎您~tank</span>&nbsp;&nbsp;&nbsp;
          <Dropdown menu={{ items }}>
            <Space>
              <UserOutlined />
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Siders collapsed={collapsed} menu={menu} />
        <Content>
          <div className={styles.breadDiv}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: () => setCollapsed(!collapsed),
            })}
            <Bread breadArr={[{path:'/dashboard',name:'首页'},{path:'/dashboard',name:'系统设置'}]} />
          </div>
          <div className={styles.contentMain}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default Home