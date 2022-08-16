import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import styles from "../../styles/pages/worker/tools/tools.module.css";
import { useRouter } from "next/router";

export default function WorkerTools() {

    const router = useRouter()

  return (
    <>
      <Header />

        <div className={styles.container}>
            <div className={styles.box} id={styles.calc}>
                <div className={styles.name}>
                    급여<br/>계산기
                </div>
            </div>
            <div className={styles.box} id={styles.help}>
                <div className={styles.name}>
                    도움<br/>요청하기
                </div>
            </div>
            <div className={styles.box} id={styles.weather} onClick={()=>window.open('https://www.kr-weathernews.com/mv3/html/main.html')}>
                <div className={styles.name}>
                    날씨<br/>확인하기
                </div>
            </div>
            <div className={styles.box} id={styles.resume}>
                <div className={styles.name}>
                    이력서<br/>확인하기
                </div>
            </div>
        </div>

      <BottomNavigation isWorker={true} />
    </>
  );
}
