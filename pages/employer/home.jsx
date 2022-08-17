import BottomNavigation from "../../components/BottomNavigation";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaPhone, FaArrowRight } from "react-icons/fa";

export default function EmployerHome() {
  const [storeData, setStoreData] = useState();
  useEffect(() => {
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/store/getInfoByOwnerId",
      withCredentials: true,
    })
      .then((res) => {
        setStoreData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="pb-24 font-pretendard">
      <Header />
      <section className="px-6">
        <div className="flex flex-col justify-between p-5 bg-white h-[135px] rounded-3xl">
          <div className="text-sm rounded-md ">나의 가게</div>
          <div className="flex">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
            <div className="px-6 ">
              <h1 className="text-lg font-semibold">
                {storeData ? storeData.name : "가게 이름 불러오는중"}
              </h1>
              <p className="text-xs text-slate-400">
                {storeData ? storeData.address : "가게 주소 불러오는중"}
              </p>
              <span className="flex items-center">
                <FaPhone className="w-3 h-3 " />
                <p className="ml-1 text-xs">
                  {storeData
                    ? storeData.phone_number
                    : "가게 전화번호 불러오는중"}
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 mt-6 ">
        <Link href="/employer/mystore">
          <div className="h-[70px] bg-[#E4EEE9] rounded-2xl flex items-center justify-between px-6 py-4 cursor-pointer">
            <div className="text-[13px] leading-4">
              <div className="flex">
                <p className="text-[#3E8752]">굿잡</p>
                <p>은 100% 무료!</p>
              </div>
              <p className="font-semibold ">무료로 모집 등록하러 가기</p>
            </div>
            <FaArrowRight className="w-6 h-6 text-[#6DA67D]" />
          </div>
        </Link>
      </section>

      <section className="px-6 mt-6 ">
        <div className="h-[100px] rounded-2xl flex items-center bg-white px-2 py-5 divide-x">
          <div className="flex flex-col items-center justify-between flex-grow h-full ">
            <p className="text-xs text-gray-500">근로자</p>
            <h1 className="text-3xl font-semibold">
              {storeData ? storeData.worker_cnt + "명" : "불러오는중"}
            </h1>
          </div>
          <div className="flex flex-col items-center justify-between flex-grow h-full">
            <p className="text-xs text-gray-500">받은 이력서</p>
            <h1 className="text-3xl font-semibold">
              {storeData ? storeData.received_resume_cnt + "개" : "불러오는중"}
            </h1>
          </div>
          <div className="flex-grow-[1.5] h-full flex flex-col justify-between items-center">
            <p className="text-xs text-gray-500">모집 상태</p>
            <h1 className="text-2xl font-semibold">
              {storeData
                ? storeData.collect_activate
                  ? "모집중"
                  : "모집중 아님"
                : "불러오는중"}
            </h1>
          </div>
        </div>
      </section>

      <section className="px-6 mt-6 ">
        <div className="flex items-center w-full h-[60px] px-6 py-2 bg-blue-200 rounded-2xl">
          <AiOutlineExclamationCircle className="w-6 text-blue-400" />
          <p className="mx-2 text-sm font-semibold text-white ">
            사장님, 청소년들의 안전한 일자리를 위해 굿잡을 이용해주셔서
            감사합니다.
          </p>
        </div>
      </section>

      <section className="px-6 mt-6 ">
        <div className="bg-white h-[350px]  rounded-2xl p-4">
          <p className="text-sm font-semibold">이건 알아두세요!</p>
          <div className="flex flex-col mt-3">
            <div className="flex items-center h-12 ">
              <p className="px-2 text-4xl font-bold">1</p>
              <p className="py-2 text-sm">
                청소년을 <strong>오후 10시 이후</strong>에도 <strong>일</strong>
                을 시키려면 <strong>당사자의 동의</strong>가 필요해요.
              </p>
            </div>
            <div className="flex items-center h-12 ">
              <p className="px-2 text-4xl font-bold">2</p>
              <p className="py-2 text-sm">
                <strong>근로계약서는 무조건</strong> 작성해야해요.
              </p>
            </div>
            <div className="flex items-center h-12 ">
              <p className="px-2 text-4xl font-bold">3</p>
              <p className="py-2 text-sm">
                1년 이상 근로계약을 체결한 경우에만{" "}
                <strong>3개월간 90%를 지급</strong>하는 것이 가능해요.
              </p>
            </div>
            <div className="flex items-center h-12 ">
              <p className="px-2 text-4xl font-bold">4</p>
              <p className="py-2 text-sm">
                주당 근로시간이 15시간 이상, 규정된 근무 일수를 채우면{" "}
                <strong>유급 주휴일</strong>을 받을 수 있어요.
              </p>
            </div>
            <div className="flex items-center h-12 ">
              <p className="px-2 text-4xl font-bold">5</p>
              <p className="py-2 text-sm">
                4시간 일하면 <strong>30분 이상</strong>, 8시간 일하면{" "}
                <strong>1시간 이상</strong>의{" "}
                <strong>휴게시간을 근무시간에</strong> 줘야해요.
              </p>
            </div>
            <div className="flex items-center h-12 ">
              <p className="px-2 text-4xl font-bold">6</p>
              <p className="py-2 text-sm">
                교육, 실습을 명목으로 임금을 주지 않는 행위는{" "}
                <strong>임금체불</strong>에 해당됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNavigation isWorker={false} />
    </div>
  );
}
