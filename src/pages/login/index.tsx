import React, { useCallback } from 'react'
import { Button, Input, Form, Checkbox, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getImgUrl } from '@/utils'
import styles from './index.module.less'
import { useAppDispatch } from '@/hooks'

const Login:React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const onFinish = useCallback((value:any) => {
    if(value.remember) localStorage.setItem('name',value.username)
    localStorage.setItem('token',`${value.username}${Date.now()}`)
    dispatch({
      type:'home/updateState',
      payload:{
        user:{
          id:value.username,
          name:value.username
        }
      }
    })
    message.success(`登录成功，欢迎您，${value.username}！`)
    navigate('/dashboard')
  },[])
  return (
    <div className={styles.loginDiv}>
      <div className={styles.title}>
        <div><b>React+TypeScript+Vite</b></div><br />
        <div><b>后台管理系统模板</b></div>
      </div>
      <div>
        <img src={getImgUrl('color-scheme-left.svg')} alt="左边logo" />
        <div className={styles.formDiv}>
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            scrollToFirstError
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{ 
              remember: true,
              username: localStorage.getItem('name') || ''
            }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input placeholder='请输入用户名：随便输入' />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password placeholder='请输入密码：随便输入' />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <img src={getImgUrl('color-scheme-right.svg')} alt="右边logo" />
      </div>
    </div>
  )
}

export default Login