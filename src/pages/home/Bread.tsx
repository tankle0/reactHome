import React, { useCallback } from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { breadType } from "@/types/home";
import { useAppDispatch } from "@/hooks";
import styles from "./index.module.less";

const Bread:React.FC<{breadArr:Array<breadType>}> = ({breadArr}) => {
  const dispatch = useAppDispatch()
  const goTo = useCallback((path:string) => {
    // 利用link标签跳转，同时更新当前选中的菜单
    let currentIndex = breadArr.findIndex(item => item.path === path),breadArrCopy = breadArr.concat([])
    dispatch({
      type:'home/updateState',
      payload:{
        currentPathname:path,
        openKeys:[path],
        breadArr:breadArrCopy.splice(0,currentIndex + 1) // 从当前点击的下标反向删除，利用splice返回值
      }
    })
  },[])
  return (
    <Breadcrumb>
      {
        breadArr.map((bread,index) => {
        return (
          <Breadcrumb.Item key={bread.path}>
            {
              index === breadArr.length - 1 ? <span className={styles.currentBread}>{bread.name}</span> :
              <Link onClick={() => goTo(bread.path)} to={bread.path}>
                {bread.name}
              </Link>
            }
          </Breadcrumb.Item>
        )})
      }
    </Breadcrumb>
  )
}

export default Bread