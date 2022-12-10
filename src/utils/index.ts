import { menuType, breadType } from "@/types/home";

/* 
  获取assets文件夹内的图片路径，name为文件名+文件类型
*/
export const getImgUrl = (name:string):string => {
  return new URL(`../assets/${name}`,import.meta.url).href
}

/* 
  根据传入的key，获取当前菜单的信息或所在父级的菜单信息
*/
export const getMenu = (key:string,menu:Array<menuType>,isCurrent:boolean=false,current?:menuType):breadType => {
  let name:string = '';
  for(let item of menu){
    if(item.key === key){
      return {
        path: isCurrent || !current ? item.key : current.key,
        name: isCurrent || !current ? item.label : current.label
      }
    }else{
      if(item.children){
        return isCurrent ? getMenu(key, item.children, isCurrent) : getMenu(key, item.children, isCurrent, item)
      }
    }
  }
  return {path:key,name}
}
