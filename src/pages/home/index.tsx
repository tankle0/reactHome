import React, { useState, Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
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
import Loading from "@/components/Loading";
import styles from "./index.module.less";

const { Header, Content } = Layout;
const menu = [
  {
    key: '/dashboard',
    icon: <VideoCameraOutlined />,
    label: '首页',
  },
  {
    key: '/system',
    icon: <UserOutlined />,
    label: '系统设置',
    children:[
      {
        key: '/system/user',
        icon: <UserOutlined />,
        label: '用户设置',
      },
      {
        key: '/system/role',
        icon: <UserOutlined />,
        label: '角色设置',
      }
    ]
  },
  {
    key: '/book',
    icon: <UploadOutlined />,
    label: '前端资料',
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
      <Link to="/system/user">
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
  const name = localStorage.getItem("name") || '外星人'
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          React+TypeScript 后台管理系统模板
        </div>
        <div className={styles.user}>
          <span>欢迎您~{name}</span>&nbsp;&nbsp;&nbsp;
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
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
export default Home