/* 
  获取assets文件夹内的图片路径，name为文件名+文件类型
*/

export const getImgUrl = (name:string):string => {
  return new URL(`../assets/${name}`,import.meta.url).href
}