import { menuType } from "@/types/home";

/* 
  获取assets文件夹内的图片路径，name为文件名+文件类型
*/
export const getImgUrl = (name:string):string => {
  return new URL(`../assets/${name}`,import.meta.url).href
}

/* 
  根据传入的key，获取所在父级的key
*/
export const getParentKey = (key:string,menu:Array<menuType>,current?:menuType):string => {
  let name:string = '';
  for(let item of menu){
    if(item.key === key){
      return current ? current.key : item.key
    }else{
      if(item.children){
        name = getParentKey(key, item.children, item)
      }
    }
  }
  return name
}
