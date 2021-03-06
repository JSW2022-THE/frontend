import Header from "../../components/Header"
import BottomNavigation from "../../components/BottomNavigation"
import styles from '../../styles/pages/worker/home/home.module.css'

export default function WorkerHome() {
  return (
    <>
      <Header />

        <div className={styles.square_container}>
            <div className={styles.square_box}>
                <div className={styles.square_text_mini}>
                    나의 근무 시간
                </div>
                <div className={styles.square_text_big}>
                    20
                </div>
                <div className={styles.square_text_mini}>
                    시간
                </div>
            </div>
            <div className={styles.square_box}>
                <div className={styles.square_text_mini}>
                    이번 달 예상 수익
                </div>
                <div className={styles.square_text_big}>
                    30
                </div>
                <div className={styles.square_text_mini}>
                    만원
                </div>
            </div>
        </div>
        <div className={styles.square_large}>
            <div className={styles.square_date}>
                <div className={styles.square_day}>
                    22
                </div>
                <div className={styles.square_day_mini}>
                    금요일
                </div>
            </div>
        </div>

      <BottomNavigation isWorker={true} />
    </>
  );
}
