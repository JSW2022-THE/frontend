import styles from '../styles/components/BottomNavigation/BottomNavigation.module.css'
import {IoMdHome} from "react-icons/io";
import classNames from "classnames";

const BottomNavigation = (props) => {
    return (
        <>
            <div className={styles.bottom_navigation}>
                {/* 메뉴 갯수에 따라 scss 파일에서 width 길이 나누기 변경할 것 (메뉴 갯수로) */}
                <div className={styles.menu}>
                    <div className={classNames(styles.menu_box, styles.menu_active)}>
                        <div className={styles.menu_center}>
                            <div className={styles.menu_icon}>
                                <IoMdHome />
                            </div>
                            <div className={styles.menu_name}>
                                홈
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu_box}>
                        <div className={styles.menu_center}>
                            <div className={styles.menu_icon}>
                                <IoMdHome />
                            </div>
                            <div className={styles.menu_name}>
                                홈
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu_box}>
                        <div className={styles.menu_center}>
                            <div className={styles.menu_icon}>
                                <IoMdHome />
                            </div>
                            <div className={styles.menu_name}>
                                홈
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu_box}>
                        <div className={styles.menu_center}>
                            <div className={styles.menu_icon}>
                                <IoMdHome />
                            </div>
                            <div className={styles.menu_name}>
                                홈
                            </div>
                        </div>
                    </div>
                    <div className={styles.menu_box}>
                        <div className={styles.menu_center}>
                            <div className={styles.menu_icon}>
                                <IoMdHome />
                            </div>
                            <div className={styles.menu_name}>
                                홈
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BottomNavigation