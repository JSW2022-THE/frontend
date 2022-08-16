import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import styles from '../../styles/pages/worker/mypage/mypage.module.css';

export default function WorkerMyPage() {
  return (
    <>
      <Header />

        <div className={styles.help}>
            <div className={styles.help_title}>
                도움이 필요하신가요?
            </div>
            <div className={styles.help_button}>
                <div className={styles.help_text_box}>
                    <div className={styles.help_text}>
                        도움 요청하기
                    </div>
                    <div className={styles.help_mini_text}>
                        365일 24시간 도움을 받을 수 있습니다.
                    </div>
                </div>
            </div>
        </div>

      <BottomNavigation isWorker={true} />
    </>
  );
}
