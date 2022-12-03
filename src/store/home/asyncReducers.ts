import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import type { User, ValidationErrors } from '@/types/home';

// createAsyncThunk 创建异步reducer
export const update = createAsyncThunk<
  User,
  { id: string } & Partial<User> // 传入的参数
>('home/update',async(userData, { rejectWithValue })=>{
  try {
    // const { id, ...fields } = userData
    const response = await Promise.resolve({data:{user:{id:'22',name:'chen'}}})
    return response.data.user
  } catch (err:any) {
    let error: AxiosError<ValidationErrors> = err
    if (!error.response) {
      throw err
    }
    return rejectWithValue(error.response.data)
  }
})