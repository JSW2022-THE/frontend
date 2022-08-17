import BottomNavigation from "../../components/BottomNavigation";
import {
  FaUserCircle,
  FaHeart,
  FaFileSignature,
  FaFileDownload,
  FaHeadset,
  FaUserCog,
} from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import ChannelService from "../../modules/channelTalk/channelTalk";
import { useRouter } from "next/router";
import { useState } from "react";
import ModifyUserDataBS from "../../components/common/ModifyUserDataBS";

import ReviewBS from "../../components/employer/ReviewBS";

export default function EmployerMyPage() {
  const router = useRouter();
  //-------------data state----------------
  const [userData, setUserData] = useState();
  const [storeData, setStoreData] = useState();
  //-------------element state----------------
  //BS == BottomSheet
  const [modifyUserDataBS, setModifyUserDataBS] = useState(false);
  const [reviewBS, setReviewBS] = useState(false);

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

  const getStoreInfo = () => {
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/store/getInfoByOwnerId",
      withCredentials: true,
    })
      .then((res) => {
        const _storeData = res.data;
        setStoreData(_storeData);
        console.log("스토어 데이터 성공적으로 불러옴");
      })
      .catch((err) => {
        console.log(err);
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

    getStoreInfo();
    return () => {
      channelTalk.shutdown();
    };
  }, []);

  return (
    <div className="pb-24 font-pretendard">
      <header className="px-5 mt-12 mb-4">
        <h1 className="text-4xl font-bold ">내 메뉴</h1>
      </header>

      <section className="px-6 mt-12">
        <span className="flex">
          <FaUserCircle className="mx-1 text-gray-400 w-14 h-14" />
          <div className="ml-3 leading-5">
            <h1 className="font-semibold text-[16px]">
              {storeData ? storeData.name : "가게이름 불러오는중"}
            </h1>
            <p className="text-sm font-semibold text-[13px] text-gray-400">
              {storeData ? storeData.address : "가게위치 불러오는중"}
            </p>
            <span className="flex items-center">
              <FaHeart className="w-[10px] h-[10px] text-rose-600" />
              <p className="ml-1 text-[13px] text-rose-600">
                {storeData ? storeData.heart : "가게 하트 불러오는중"}
              </p>
            </span>
          </div>
        </span>
      </section>
      <section className="px-6 mt-6 ">
        <span className="flex items-center justify-between px-4 py-2">
          <div className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer">
            <FaFileSignature className="w-6 h-6 ml-1" />
            <p className="text-[13px] font-semibold">근로계약서</p>
          </div>
          <div
            onClick={() => {
              setReviewBS(true);
            }}
            className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer"
          >
            <FaHeart className="w-6 h-6 text-rose-600" />
            <p className="text-[13px] font-semibold">우리가게 리뷰</p>
          </div>
          <div className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer">
            <FaFileDownload className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">이력서 보기</p>
          </div>
        </span>
        <span className="flex items-center justify-between px-4 py-2">
          <div
            onClick={() => {
              setModifyUserDataBS(true);
            }}
            className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer"
          >
            <FaUserCog className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">정보수정</p>
          </div>
          <div
            onClick={() => {
              window.ChannelIO("showMessenger");
            }}
            className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer"
          >
            <FaHeadset className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">고객지원</p>
          </div>
          <div
            onClick={logout}
            className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer"
          >
            <BsBoxArrowRight className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">로그아웃</p>
          </div>
        </span>
      </section>
      {/* -------------react-spring-bottom-sheet------------------- */}
      {userData && storeData ? (
        <ModifyUserDataBS
          open={modifyUserDataBS}
          handleClose={() => {
            setModifyUserDataBS(false);
          }}
          storeData={storeData}
          setStoreData={setStoreData}
          userData={userData}
          setUserData={setUserData}
        />
      ) : null}
      {storeData ? (
        <ReviewBS
          open={reviewBS}
          handleClose={() => {
            setReviewBS(false);
          }}
          storeData={storeData}
        />
      ) : null}
      <BottomNavigation isWorker={false} />
    </div>
  );
}
