import React, { useState, Suspense, useMemo, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Dropdown, Space, Modal } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Bread from "./Bread";
import Siders from "./Sider";
import Loading from "@/components/Loading";
import styles from "./index.module.less";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { update } from "@/store/home/asyncReducers";

const { Header, Content } = Layout;

const Home:React.FC = () => {
  // 调用异步reducer写法
  // const dispatch = useAppDispatch()
  // const loginOut = () => {
  //   dispatch(update({id:'1'}))
  // }
  useEffect(() => {
    if(document.body.offsetWidth <= 700) setCollapsed(true)
    else setCollapsed(false)
    window.onresize = _.throttle((e:any) => {
      let width = e.target.innerWidth
      if(width <= 700) setCollapsed(true)
      else setCollapsed(false)
    },500)
    return () => {window.onresize = null}
  },[])
  const navigate = useNavigate()
  const loginOut = useCallback(() => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '确认退出登录吗?',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        localStorage.removeItem('token')
        navigate('/login')
      }
    });
  },[])
  const items: MenuProps['items'] = useMemo(() => (
    [
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
          <a onClick={loginOut}>
            退出登录
          </a>
        ),
        key: '2',
      }
    ]
  ),[]);
  const [collapsed, setCollapsed] = useState(false);
  const { menu, user:{name} } = useAppSelector((state) => state.home)

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