import { ReactNode } from "react"
import type { MenuProps } from "antd";

export interface breadType {
  path:string,
  name:string
}
export interface menuType {
  key:string,
  label:string,
  icon?:ReactNode,
  children?:Array<menuType>
}

export interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

export interface UpdateUserResponse {
  user: User
  success: boolean
}

export interface User {
  id?: string
  name: string
}

export interface HomeState {
  // menu:Array<menuType>,
  currentPathname:string,
  breadArr:breadType[],
  openKeys:string[],
  user:User,
}