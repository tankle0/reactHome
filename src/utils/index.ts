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
export const getMenu = (key:string,menu:Array<menuType>,isCurrent:boolean=false,current?:menuType):any => {
  let currentItem:breadType = {path:'',name:''};
  for(let item of menu){
    if(item.children){
      // 接收递归返回的结果
      currentItem = isCurrent ? getMenu(key, item.children, isCurrent) : getMenu(key, item.children, isCurrent, item)
      if(currentItem) return currentItem
      else return {path:key,name:''}
    }else{
      if(item.key === key){
        currentItem = {
          path: isCurrent ? item.key : !current ? item.key : current.key,
          name: isCurrent ? item.label : !current ? item.label : current.label
        }
        return currentItem // 匹配到的结果需返回
      }
    }
  }
}
