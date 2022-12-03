/* 
  Redux Toolkit解决react-redux中发起异步请求 文档地址 https://redux-toolkit.js.org/api/createAsyncThunk
  Redux 只是用来传递数据，使用dispatch 调用reducer时，payload不能传递函数，且state只允许是纯数据不能包含组件,否则报错:
  文档地址: https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
*/
import { createSlice } from '@reduxjs/toolkit';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { HomeState } from '@/types/home';
import { update } from './asyncReducers';

// 初始化state
const initialState = {
  menu:[
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
  ], // 建议写在页面内，因为内部包含图标组件，不符合redux规定，控制台报错，详见顶部文档
  user:{
    id:'',
    name:localStorage.getItem('name') || '外星人'
  },
} as HomeState

// createSlice为模块化创建
export const homeStore = createSlice({
  name:'home',
  initialState,
  // 同步reducers
  reducers:{
    updateState: (state, { payload }) => {
      state = {
        ...state,
        ...payload
      }
    },
  },
  // 异步reducers
  extraReducers:(builder) => {
    /* 
      createAsyncThunk 创建异步reducer后返回三个状态，并作为调用异步action的类型：
      1.pending 对应的是 'home/update/pending'    请求中
      2.fulfilled 对应的是 'home/update/fulfilled'  请求完成
      3.rejected 对应的是 'home/update/rejected'  请求失败

      payload 为请求成功或失败后的返回值
    */
    builder.addCase(update.fulfilled,(state,{ payload }) => {
      console.log(payload,'payload');
      state.user = payload
    })
  }
})

// react-redux自动生成reducer对应的action，可直接通过dispatch调用action
export const { updateState } = homeStore.actions
export default homeStore.reducer