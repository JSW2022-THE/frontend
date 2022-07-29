import Header from "../../components/Header"
import BottomNavigation from "../../components/BottomNavigation"
import styles from '../../styles/pages/worker/home/home.module.css'

export default function WorkerHome() {
  return (
    <>
      <Header />

        <div className={styles.square_container}>
            <div className={styles.square_box} style={{background: 'linear-gradient(135deg, rgba(0,223,80,1) 0%, rgba(0,120,41,1) 100%)'}}>
                <div className={styles.square_text_mini} style={{color: 'white'}}>
                    나의 근무 시간
                </div>
                <div className={styles.square_text_big} style={{color: 'white'}}>
                    20
                </div>
                <div className={styles.square_text_mini} style={{color: 'white'}}>
                    시간
                </div>
            </div>
            <div className={styles.square_box} style={{background: 'linear-gradient(135deg, rgba(254,240,16,1) 0%, rgba(156,255,107,1) 100%)'}}>
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
            <div className={styles.square_todo_container}>
                <div className={styles.square_todo_box}>
                    <div className={styles.square_todo_text}>
                        태진떡볶이 출근
                    </div>
                    <div className={styles.square_todo_time}>
                        오후 2시 ~ 오후 5시
                    </div>
                </div>
                {/*<div className={styles.square_todo_box}>*/}
                {/*    <div className={styles.square_todo_text}>*/}
                {/*        태진떡볶이 출근*/}
                {/*    </div>*/}
                {/*    <div className={styles.square_todo_time}>*/}
                {/*        오후 2시 ~ 오후 5시*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>

      <BottomNavigation isWorker={true} />
    </>
  );
}
