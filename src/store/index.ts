import { configureStore } from "@reduxjs/toolkit"
import homeStore from "./home/homeStore"

// 全局store,合并其他模块化的store
const store =  configureStore({
  reducer:{
    home:homeStore
  }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch