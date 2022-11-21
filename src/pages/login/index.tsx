import React from 'react'
import { Button, Input, Form, Checkbox } from 'antd'
import { getImgUrl } from '@/utils'
import styles from './index.module.less'

const Login:React.FC = () => {
  const onFinish = () => {
    
  }
  const onFinishFailed = () => {
    
  }
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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