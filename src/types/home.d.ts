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