import { ReactNode } from "react"

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
  id: string
  first_name: string
  last_name: string
  email: string,
  age:number
}

export interface HomeState {
  num:number,
  user:User
}