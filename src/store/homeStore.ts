/* 
  Redux Toolkit解决react-redux中发起异步请求 文档地址 https://redux-toolkit.js.org/api/createAsyncThunk
*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import type { User, HomeState, ValidationErrors, UpdateUserResponse } from '@/types/home'

export declare const userAPI: {
  updateById<Response>(id: string, fields: {}): { data: Response }
}

// createAsyncThunk 创建异步reducer
export const update = createAsyncThunk<
  User, 
  { id: string } & Partial<User>,
  {
    rejectValue: ValidationErrors
  }
>('home/update',async(userData, { rejectWithValue })=>{
  try {
    const { id, ...fields } = userData
    const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
    return response.data.user
  } catch (err:any) {
    let error: AxiosError<ValidationErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})

// 初始化state
const initialState = {
  num:1,
  user:{}
} as HomeState

// createSlice为模块化创建
export const homeStore = createSlice({
  name:'home',
  initialState,
  // 同步reducers
  reducers:{
    add: (state) => {
      state.num++
    },
    decrement: (state) => {
      state.num -= 1
    },
    incrementByAmount: (state, action) => {
      state.num += action.payload
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
export const { add, decrement, incrementByAmount } = homeStore.actions
export default homeStore.reducer