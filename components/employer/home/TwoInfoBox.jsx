import styles from "../../../styles/components/employer/home/TwoInfoBox/TwoInfoBox.module.css";

export default function TwoInfoBox() {
  return (
    <section>
      <div className={styles.info_box_container}>
        <div className={styles.info_box}>
          <p className={styles.info_box_title}>무언가 들어갈곳</p>
          <p className={styles.info_box_number}>{2}</p>
          <p className={styles.info_box_type}>개</p>
        </div>
        <div className={styles.info_box}>
          <p className={styles.info_box_title}>지원한 이력서</p>
          <p className={styles.info_box_number}>{2}</p>
          <p className={styles.info_box_type}>개</p>
        </div>
      </div>
    </section>
  );
}
