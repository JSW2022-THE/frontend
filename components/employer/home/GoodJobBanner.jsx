import styles from "../../../styles/components/employer/home/GoodJobBanner/GoodJobBanner.module.css";
import { IoArrowForwardOutline } from "react-icons/io5";
import Link from "next/link";

export default function GoodJobBanner() {
  return (
    <section>
      <div className={styles.banner_container}>
        <Link href="/employer/gonggo">
          <div className={styles.banner}>
            <div>
              <div className={styles.banner_text}>
                <p style={{ color: "#3E8752" }}>굿잡</p>
                <p>은 100% 무료!</p>
              </div>
              <div className={styles.banner_text}>
                <p>무료로 공고 등록하러 가기</p>
              </div>
            </div>
            <IoArrowForwardOutline className={styles.right_icon} size="30px" />
          </div>
        </Link>
      </div>
    </section>
  );
}
