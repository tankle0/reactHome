import { configureStore } from "@reduxjs/toolkit"
import homeStore from "./homeStore"

const store =  configureStore({
  reducer:{
    home:homeStore
  }
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch