import BottomNavigation from "../../components/BottomNavigation";
import {
  FaUserCircle,
  FaHeart,
  FaFileSignature,
  FaFileDownload,
  FaHeadset,
  FaUserCog,
  FaBullhorn,
} from "react-icons/fa";
import { useEffect } from "react";

import ChannelService from "../../modules/channelTalk/channelTalk";

export default function EmployerMyPage() {
  useEffect(() => {
    const channelTalk = new ChannelService();
    channelTalk.boot({
      pluginKey: process.env.NEXT_PUBLIC_CT_PLUGIN_KRY,
      memberId: "asdfksdafjldksf",
      profile: {
        name: "김김김", //fill with user name
        mobileNumber: "01012345678", //fill with user phone number
        email: "abc@naver.com",
      },
    });
    return () => {
      channelTalk.shutdown();
    };
  }, []);
  return (
    <div className="pb-24 font-pretendard">
      <header className="px-5 mt-12 mb-4">
        <span className="flex items-center justify-between">
          <h1 className="text-4xl font-bold ">내 메뉴</h1>
          <button className="text-sm font-semibold text-gray-400">
            로그아웃
          </button>
        </span>
      </header>

      <section className="px-6 mt-12">
        <span className="flex">
          <FaUserCircle className="mx-1 text-gray-400 w-14 h-14" />
          <div className="ml-3 leading-5">
            <h1 className="font-semibold text-[16px]">맛있는 크로아상</h1>
            <p className="text-sm font-semibold text-[13px] text-gray-400">
              충북 청주시 상당구 용정로 35
            </p>
            <span className="flex items-center">
              <FaHeart className="w-[10px] h-[10px] text-rose-600" />
              <p className="ml-1 text-[13px] text-rose-600">489</p>
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
          <div className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer">
            <FaHeart className="w-6 h-6 text-rose-600" />
            <p className="text-[13px] font-semibold">우리가게 리뷰</p>
          </div>
          <div className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer">
            <FaFileDownload className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">이력서 보기</p>
          </div>
        </span>
        <span className="flex items-center justify-between px-4 py-2">
          <div className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer">
            <FaUserCog className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">정보수정</p>
          </div>
          <div className="w-[90px] h-[70px] bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer">
            <FaBullhorn className="w-6 h-6 " />
            <p className="text-[13px] font-semibold">공지사항</p>
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
        </span>
      </section>
      <BottomNavigation isWorker={false} />
    </div>
  );
}
