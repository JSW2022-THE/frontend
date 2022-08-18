import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import styles from "../../styles/pages/worker/home/home.module.css";

export default function WorkerHome() {
  const day = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
  return (
    <>
      <Header />

      <div className={styles.square_container}>
        <div
          className={styles.square_box}
          style={{
            background:
              "linear-gradient(135deg, rgba(0,223,80,1) 0%, rgba(0,120,41,1) 100%)",
          }}
        >
          <div className={styles.square_text_mini} style={{ color: "white" }}>
            나의 근무 시간
          </div>
          <div className={styles.square_text_big} style={{ color: "white" }}>
            20
          </div>
          <div className={styles.square_text_mini} style={{ color: "white" }}>
            시간
          </div>
        </div>
        <div
          className={styles.square_box}
          style={{
            background:
              "linear-gradient(135deg, rgba(254,240,16,1) 0%, rgba(156,255,107,1) 100%)",
          }}
        >
          <div className={styles.square_text_mini}>이번 달 예상 수익</div>
          <div className={styles.square_text_big}>30</div>
          <div className={styles.square_text_mini}>만원</div>
        </div>
      </div>
      <div className={styles.square_large}>
        <div className={styles.square_date}>
          <div className={styles.square_day}>{new Date().getDate()}</div>
          <div className={styles.square_day_mini}>{day[new Date().getDay()]}</div>
        </div>
        <div className={styles.square_todo_container}>
          <div className={styles.square_todo_box}>
            <div className={styles.square_todo_text}>
              파리바게트 용정점 출근
            </div>
            <div className={styles.square_todo_time}>오후 2시 ~ 오후 5시</div>
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

      <div className="px-8 mt-6">
        <div className="bg-white h-[260px] rounded-3xl p-6 ">
          <h1 className="font-semibold">내가 일하는 가게</h1>
          <p className="text-sm text-gray-400">파리바게트 용정점</p>
          <textarea
            value={"사장님이 매우 친절하시고 배려심이 남다르셔요 :)"}
            className="w-full h-24 p-3 mt-3 text-sm bg-gray-100 resize-none rounded-2xl"
          />
          <button className="w-full h-12 mt-2 font-bold text-white bg-green-500 rounded-2xl">
            리뷰 수정하기
          </button>
        </div>
      </div>

      <BottomNavigation isWorker={true} />
    </>
  );
}
