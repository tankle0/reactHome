import { useCallback } from 'react';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import styles from './index.module.less';

export default function ErrorPage(){
  const dispatch = useAppDispatch()
  const back = useCallback(() => {
    dispatch({
      type:'home/updateState',
      payload:{
        currentPathname:'/dashboard',
        breadArr:[
          {path:'/dashboard',name:'首页'}
        ]
      }
    })
  },[])
  return (
    <div className={styles.emptyDiv}>
      <Empty description={ <div><b>糟糕！页面被外星人劫走了~</b> <br /><Link onClick={back} to="/dashboard" >返回首页</Link></div> } />
    </div>
  )
}