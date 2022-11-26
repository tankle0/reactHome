import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.module.less'

export default function ErrorPage(){
  return (
    <div className={styles.emptyDiv}>
      <Empty description={ <div><b>糟糕！页面被外星人劫走了~</b> <br /><Link to="/" >返回首页</Link></div> } />
    </div>
  )
}