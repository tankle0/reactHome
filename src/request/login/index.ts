import request from '../index'
import { loginType } from '@/types/login'

export const doLogin = (data:loginType) => {
  return request({
    url:'/login',
    method:'post',
    data
  })
}
