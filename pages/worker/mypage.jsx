import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import styles from "../../styles/pages/worker/mypage/mypage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ChannelService from "../../modules/channelTalk/channelTalk";
import { FaUserCircle, FaFileAlt } from "react-icons/fa";
import ModifyUserDataBS from "../../components/common/ModifyUserDataBS";
import { useRouter } from "next/router";

export default function WorkerMyPage() {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [modifyUserDataBS, setModifyUserDataBS] = useState(false);

  const logout = () => {
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/logout",
      withCredentials: true,
    })
      .then((res) => {
        alert(res.data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("로그아웃 에러");
      });
  };

  useEffect(() => {
    const channelTalk = new ChannelService();
    axios({
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/getLoggedInUserInfo",
      withCredentials: true,
    })
      .then((res) => {
        setUserData(res.data);
        console.log("로그인 O");
        console.log("유저 데이터 성공적으로 불러옴");
        //로그인이 되어 있을때 고객 정보랑 같이 채널톡 호출
        channelTalk.boot({
          pluginKey: process.env.NEXT_PUBLIC_CT_PLUGIN_KRY,
          memberId: res.data.uuid,
          profile: {
            name: res.data.name,
            mobileNumber: res.data.phone_number,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        console.log("로그인 X");
        //로그인이 안되어 있을때 고객 정보 없이 채널톡 호출
        channelTalk.boot({
          pluginKey: process.env.NEXT_PUBLIC_CT_PLUGIN_KRY,
        });
      });

    return () => {
      channelTalk.shutdown();
    };
  }, []);
  return (
    <div className=" font-pretendard">
      <Header />
      <header className="flex justify-between w-full px-6 text-2xl font-semibold">
        <h1>내 메뉴</h1>
        <button
          className="text-sm font-semibold text-gray-400"
          onClick={logout}
        >
          로그아웃
        </button>
      </header>
      <section className="px-8 mt-4">
        <div className="h-[160px] bg-white rounded-3xl flex flex-col justify-between p-6">
          <div className="flex ">
            <div className="">
              <FaUserCircle className="m-2 text-gray-400 w-14 h-14" />
            </div>
            <div className="p-2 text-sm">
              <span className="flex font-semibold">
                <p className="text-gray-400">이름</p>
                <p className="ml-2">
                  {userData ? userData.name : "이름 불러오는중"}
                </p>
              </span>
              <span className="flex font-semibold">
                <p className="text-gray-400">전화번호</p>
                <p className="ml-2">
                  {userData ? userData.phone_number : "전화번호 불러오는중"}
                </p>
              </span>
              <span className="flex font-semibold">
                <p className="text-gray-400">나이</p>
                <p className="ml-2">
                  {userData ? userData.age + "세" : "나이 불러오는중"}
                </p>
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setModifyUserDataBS(true);
            }}
            className="h-12 font-semibold text-white bg-blue-500 rounded-3xl"
          >
            내 정보 수정
          </button>
        </div>
      </section>
      <section className="px-8 py-4">
        <div
          onClick={() => {
            router.push("/worker/myresume");
          }}
          className="h-[55px] bg-white rounded-2xl py-4 px-6 flex"
        >
          <FaFileAlt className="w-6 h-6" />
          <p className="w-full text-[15px] text-center">
            나의 이력서 수정 및 보기
          </p>
        </div>
      </section>
      <section>
        <div className={styles.help}>
          <div className={styles.help_title}>도움이 필요하신가요?</div>
          <div
            onClick={() => {
              window.ChannelIO("showMessenger");
            }}
            className={styles.help_button}
          >
            <div className={styles.help_text_box}>
              <div className={styles.help_text}>도움 요청하기</div>
              <div className={styles.help_mini_text}>
                365일 24시간 도움을 받을 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </section>
      {userData ? (
        <ModifyUserDataBS
          open={modifyUserDataBS}
          handleClose={() => {
            setModifyUserDataBS(false);
          }}
          userData={userData}
          setUserData={setUserData}
        />
      ) : null}
      <BottomNavigation isWorker={true} />
    </div>
  );
}
