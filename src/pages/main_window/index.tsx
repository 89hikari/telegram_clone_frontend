import { Input } from 'antd'
import styles from './index.module.scss'

const MainWindow: React.FC = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className={styles.search}>
                    <div className={styles.options_btn}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <Input
                        placeholder="Search"
                        style={{ height: 42, borderRadius: 22, padding: "0 44px" }} />
                </div>
                <div className={styles.conversations}>
                    <div className={styles.conversation}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainWindow
