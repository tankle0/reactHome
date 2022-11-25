import { Empty } from 'antd';
import styles from './index.module.less'

export default function ErrorPage(){
  return (
    <div className={styles.emptyDiv}>
      <Empty description={<b>糟糕！页面被外星人劫走了~</b>} />
    </div>
  )
}