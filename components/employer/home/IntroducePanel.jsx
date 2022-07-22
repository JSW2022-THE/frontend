import styles from "../../../styles/components/employer/home/IntroducePanel/IntroducePanel.module.css";

export default function IntroducePanel() {
  return (
    <section>
      <div className={styles.worker_counter_container}>
        <div className={styles.worker_counter}>
          <div>
            <div className={styles.worker_counter_text}>
              <p>우리가게의 알바생</p>
              <p style={{ color: "#3E8752", marginLeft: "6px" }}>2</p>
              <p>명</p>
            </div>
            <div className={styles.worker_counter_desc}>
              <p>빠리바게트 뉴욕시티점</p>
            </div>
          </div>
          <a className={styles.worker_counter_button}>보기</a>
        </div>
      </div>
      <div className={styles.introduce_container}>
        <div className={styles.introduce_box}>
          <span className={styles.introduce_box_left_title}>
            <h1 style={{ color: "#3E8752" }}>굿잡</h1>
            <h1>은</h1>
          </span>

          <p className={styles.introduce_box_left_index}>
            학생의 노동권 보장을 위해 만들어진 서비스입니다.
          </p>
        </div>
        <div className={styles.introduce_box}>
          <div>
            <h1 className={styles.introduce_box_right_title_bold}>사장님!</h1>
            <p className={styles.introduce_box_right_title}>
              이것만은 꼭 지켜주세요.
            </p>
          </div>
          <p className={styles.introduce_box_right_index}>
            굿잡에서는 청소년의 채용이 이루어 집니다. 사장님의 좋은 매너
            부탁드립니다.
          </p>
        </div>
      </div>
      <div className={styles.warning_container}>
        <div className={styles.warning}>
          <div>
            <h1 className={styles.warning_title_big}>이러한 업종은</h1>
            <p className={styles.warning_title}>굿잡을 이용할 수 없어요!</p>
          </div>
          <div className={styles.warning_index_container}>
            <p>•청소년 출입과 고용이 전부 금지된 업소</p>
            <div>
              <p>•청소년의 출입은 가능하나 고용이 금지된 업소</p>
              <p style={{ marginLeft: "6px", marginTop: "4px" }}>
                (PC방, 노래방, 숙박업, 만화 대여점 등)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
