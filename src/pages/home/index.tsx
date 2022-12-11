import React, { useState, Suspense, useMemo, useCallback, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Dropdown, Space, Modal, message } from "antd"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  SettingOutlined,
  TeamOutlined,
  SkinOutlined,
  MailOutlined,
  MessageOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import Bread from "./Bread";
import Siders from "./Sider";
import Loading from "@/components/Loading";
import styles from "./index.module.less";
import _ from "lodash";
import { useAppSelector } from "@/hooks";
import { update } from "@/store/home/asyncReducers";

const { Header, Content } = Layout;

// menu建议写在页面内，因为内部包含图标组件，写在redux内不符合redux规定，控制台报错，详见homeStore文件顶部文档
export const menu = [
  {
    key: '/dashboard',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: '/system',
    icon: <SettingOutlined />,
    label: '系统设置',
    children:[
      {
        key: '/system/user',
        icon: <TeamOutlined />,
        label: '用户设置',
      },
      {
        key: '/system/role',
        icon: <SkinOutlined />,
        label: '角色设置',
      }
    ]
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: '个人中心',
    children:[
      {
        key: '/user/msg',
        icon: <MessageOutlined />,
        label: '个人信息',
      },
      {
        key: '/user/info',
        icon: <MailOutlined />,
        label: '个人动态',
      }
    ]
  },
  {
    key: '/book',
    icon: <FolderOpenOutlined />,
    label: '前端资料',
  },
]
const Home:React.FC = () => {
  // 调用异步reducer写法
  // const dispatch = useAppDispatch()
  // const loginOut = useCallback(() => {
  //   dispatch(update({id:'1'})).then(res=>{ // 写法1，在当前页面处理异步结果
  //     console.log(res,'res...');
  //   })
  //   dispatch(update({id:'1'})) // 写法2，在react-redux中处理异步结果
  // },[])

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // 待改造，统一移到redux内
  const { user:{name},breadArr } = useAppSelector((state) => state.home);

  useEffect(() => { //页面初始化时根据屏幕大小设置菜单折叠及增加页面窗口大小监听器
    if(document.body.offsetWidth <= 700) setCollapsed(true);
    else setCollapsed(false);
    window.onresize = _.throttle((e:any) => {
      let width = e.target.innerWidth;
      if(width <= 700) setCollapsed(true);
      else setCollapsed(false);
    },200)
    return () => {window.onresize = null}
  },[])

  const loginOut = useCallback(() => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认退出登录吗?',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        localStorage.clear();
        message.success('您已退出登录!');
        navigate('/login');
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

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          React+TypeScript 后台管理系统模板
        </div>
        <div className={styles.user}>
          <span>欢迎您，{name}</span>&nbsp;&nbsp;&nbsp;
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
            <Bread breadArr={breadArr} />
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