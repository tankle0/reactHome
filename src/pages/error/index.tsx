import { useRouteError } from 'react-router-dom';
import { Empty } from 'antd';
import styles from './index.module.less'

export default function ErrorPage(){
  const error = useRouteError() as {statusText:string,message:string}
  return (
    <div className={styles.emptyDiv}>
      <Empty description={<div><i>{error.statusText || error.message}</i><br /><b>糟糕！页面被外星人劫走了~</b></div>} />
    </div>
  )
}