/* 
  Redux Toolkit解决react-redux中发起异步请求 文档地址 https://redux-toolkit.js.org/api/createAsyncThunk
  Redux 只是用来传递数据，使用dispatch 调用reducer时，payload不能传递函数，且state只允许是纯数据不能包含组件,否则报错:
  文档地址: https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
*/
import { createSlice } from '@reduxjs/toolkit';
import type { HomeState } from '@/types/home';
import { update } from './asyncReducers';

// 初始化state
const initialState = {
  currentPathname:'',
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
      return {
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
      return {
        ...state,
        user:{
          ...payload
        }
      }
    })
  }
})

// react-redux自动生成reducer对应的action，可直接通过dispatch调用action
export const { updateState } = homeStore.actions
export default homeStore.reducer