import BottomNavigation from "../../components/BottomNavigation";
import { useEffect, useState } from "react";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";
import axios from "axios";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

export default function EmployerMyStore() {
  const [storeData, setStoreData] = useState();
  const [storeWorkers, setStoreWorkers] = useState(); //해당 스토어 uuid에 따른 노동자 리스트
  //-------------------Bottom Sheet State-------------------
  const [modifyCollectDesc, setModifyCollectDesc] = useState(false);
  const [modifyCollectInfo, setModifyCollectInfo] = useState(false);
  //-------------------Bottom Sheet State-------------------//
  const [modifiedCollectDescData, setModifiedCollectDescData] = useState();
  const [modifiedCollectInfoData, setModifiedCollectInfoData] = useState({});

  const getStoreData = () => {
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
  };

  const modifyStoreData = (_modifiedData) => {
    axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/store/modifyStoreInfo",
      data: _modifiedData,
      withCredentials: true,
    })
      .then((res) => {
        getStoreData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (storeData) {
      setModifiedCollectDescData(storeData.collect_desc);
      setModifiedCollectInfoData({
        collect_money: storeData.collect_money,
        collect_position: storeData.collect_position,
        collect_time: storeData.collect_time,
        collect_person_cnt: storeData.collect_person_cnt,
      });
    }
  }, [storeData]);

  useEffect(() => {
    getStoreData();
  }, []);
  return (
    <div className="pb-24 font-pretendard">
      <header className="px-5 mt-12 mb-4">
        <h1 className="text-4xl font-bold ">내 가게</h1>
      </header>

      <section className="px-6 mt-6">
        <p className="text-lg font-semibold text-gray-500 ">
          모집상태 :{" "}
          {storeData
            ? storeData.collect_activate
              ? "모집중"
              : "모집중이 아님"
            : "불러오는중"}
        </p>
        <div className="h-[80px] bg-white rounded-2xl my-2 flex justify-between items-center p-6">
          <div>
            <h1 className="font-bold">
              {storeData ? storeData.name : "불러오는중"}
            </h1>
            <p className="text-sm font-semibold text-gray-400">
              지원자 (계약서에 해당 스토어 개수)명
            </p>
          </div>
          <label
            htmlFor="default-toggle"
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              checked={storeData ? storeData.collect_activate : false}
              onChange={(e) => {
                console.log(e.target.checked);
                modifyStoreData({
                  store_uuid: storeData.store_uuid,
                  collect_activate: !storeData.collect_activate,
                });
              }}
              id="default-toggle"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-400"></div>
          </label>
        </div>
        <div
          onClick={() => {
            setModifyCollectDesc(true);
          }}
          className="p-4 my-2 bg-white rounded-2xl"
        >
          <span className="flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">소개글</h1>
            <p className="text-xs text-gray-400">여기를 눌러 수정하기</p>
          </span>
          <p className="mt-2 ">
            {storeData ? storeData.collect_desc : "불러오는중"}
          </p>
        </div>
        <div
          onClick={() => {
            setModifyCollectInfo(true);
          }}
          className="p-4 my-2 bg-white rounded-2xl"
        >
          <span className="flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">모집 정보</h1>
            <p className="text-xs text-gray-400">여기를 눌러 수정하기</p>
          </span>
          <div className="leading-[22px] mt-3">
            <span className="flex">
              <p className="text-gray-500">시급</p>
              <p className="ml-2 font-semibold">
                {storeData ? storeData.collect_money + "원" : "불러오는중"}
              </p>
            </span>
            <span className="flex">
              <p className="text-gray-500">포지션</p>
              <p className="ml-2 font-semibold">
                {storeData ? storeData.collect_position : "불러오는중"}
              </p>
            </span>
            <span className="flex">
              <p className="text-gray-500">근무시간</p>
              <p className="ml-2 font-semibold">
                {storeData ? storeData.collect_time : "불러오는중"}
              </p>
            </span>
            <span className="flex">
              <p className="text-gray-500">모집인원</p>
              <p className="ml-2 font-semibold">
                {storeData ? storeData.collect_person_cnt + "명" : "불러오는중"}
              </p>
            </span>
          </div>
        </div>
      </section>
      <section className="px-6 mt-6 ">
        {/* <Link href="/여기에 이력서 링크 입력"> //TODO:이력서 페이지 링크하기 */}
        <div className="h-[70px] bg-[#E4EEE9] rounded-2xl flex items-center justify-between px-6 py-4 cursor-pointer">
          <div className="text-[13px] leading-4">
            <div className="flex font-semibold">
              <p className="">지금까지 지원한 이력서 총 </p>
              <p className=" text-[#3E8752] ml-1">
                (계약서에 해당 스토어 개수)
              </p>
              <p>개</p>
            </div>
            <p className="">이력서 보러가기</p>
          </div>
          <FaArrowRight className="w-6 h-6 text-[#6DA67D]" />
        </div>
        {/* </Link> */}
      </section>
      <section className="px-6 mt-6">
        <p className="py-2 text-lg font-semibold text-gray-500">
          우리가게 알바생
        </p>
        <div className="px-5 py-3 bg-white divide-y divide-gray-300 divide-solid rounded-2xl">
          <OurStoreWorkerItem />
          <OurStoreWorkerItem />
          <OurStoreWorkerItem />
        </div>
      </section>
      {/* ----------------Bottom Sheet 모집 소개글 수정---------------- */}
      <BottomSheet
        open={modifyCollectDesc}
        onDismiss={() => {
          setModifyCollectDesc(false);
          setModifiedCollectDescData(storeData.collect_desc);
        }}
        header={<header className="font-bold">모집 소개글 수정</header>}
        footer={
          <footer className="flex justify-between">
            <button
              onClick={() => {
                setModifyCollectDesc(false);
                setModifiedCollectDescData(storeData.collect_desc);
              }}
              className="w-full h-12 mx-2 bg-slate-200 rounded-3xl"
            >
              취소
            </button>
            <button
              onClick={() => {
                setModifyCollectDesc(false);
                modifyStoreData({
                  store_uuid: storeData.store_uuid,
                  collect_desc: modifiedCollectDescData,
                });
              }}
              className="w-full h-12 mx-2 text-green-700 bg-green-300 rounded-3xl"
            >
              수정
            </button>
          </footer>
        }
      >
        <div className="p-6">
          <header className="text-xl font-semibold">소개글 수정</header>
          <div className="flex justify-between w-[300px] mt-4 items-center">
            <textarea
              className="w-full h-64 p-4 text-gray-600 bg-gray-200 resize-none rounded-2xl focus:outline-none"
              value={modifiedCollectDescData}
              onChange={(e) => {
                setModifiedCollectDescData(e.target.value);
              }}
            />
          </div>
        </div>
      </BottomSheet>
      {/* ----------------Bottom Sheet 모집 정보 수정---------------- */}
      <BottomSheet
        open={modifyCollectInfo}
        onDismiss={() => {
          setModifyCollectInfo(false);
          setModifiedCollectInfoData({
            collect_money: storeData.collect_money,
            collect_position: storeData.collect_position,
            collect_time: storeData.collect_time,
            collect_person_cnt: storeData.collect_person_cnt,
          });
        }}
        header={<header className="font-bold">모집 정보 수정</header>}
        footer={
          <footer className="flex justify-between">
            <button
              onClick={() => {
                setModifyCollectInfo(false);
                setModifiedCollectInfoData({
                  collect_money: storeData.collect_money,
                  collect_position: storeData.collect_position,
                  collect_time: storeData.collect_time,
                  collect_person_cnt: storeData.collect_person_cnt,
                });
              }}
              className="w-full h-12 mx-2 bg-slate-200 rounded-3xl"
            >
              취소
            </button>
            <button
              onClick={() => {
                setModifyCollectInfo(false);
                modifyStoreData({
                  store_uuid: storeData.store_uuid,
                  collect_money: modifiedCollectInfoData.collect_money,
                  collect_position: modifiedCollectInfoData.collect_position,
                  collect_time: modifiedCollectInfoData.collect_time,
                  collect_person_cnt:
                    modifiedCollectInfoData.collect_person_cnt,
                });
              }}
              className="w-full h-12 mx-2 text-green-700 bg-green-300 rounded-3xl"
            >
              수정
            </button>
          </footer>
        }
      >
        <div className="p-6">
          <header className="text-xl font-semibold">모집 정보 수정</header>
          <div className="flex justify-between w-[300px] mt-4 items-center">
            <p className="text-sm text-gray-400">시급 (숫자만)</p>
            <input
              className="ml-6 text-gray-600 border-b-2 focus:outline-none"
              value={modifiedCollectInfoData.collect_money}
              onChange={(e) => {
                setModifiedCollectInfoData((_Pdata) => {
                  return { ..._Pdata, collect_money: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex justify-between w-[300px] mt-4 items-center">
            <p className="text-sm text-gray-400">포지션</p>
            <input
              className="ml-6 text-gray-600 border-b-2 focus:outline-none"
              value={modifiedCollectInfoData.collect_position}
              onChange={(e) => {
                setModifiedCollectInfoData((_Pdata) => {
                  return { ..._Pdata, collect_position: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex justify-between w-[300px] mt-4 items-center">
            <p className="text-sm text-gray-400">근무시간</p>
            <input
              className="ml-6 text-gray-600 border-b-2 focus:outline-none"
              value={modifiedCollectInfoData.collect_time}
              onChange={(e) => {
                setModifiedCollectInfoData((_Pdata) => {
                  return { ..._Pdata, collect_time: e.target.value };
                });
              }}
            />
          </div>
          <div className="flex justify-between w-[300px] mt-4 items-center">
            <p className="text-sm text-gray-400">모집인원 (숫자만)</p>
            <input
              className="ml-6 text-gray-600 border-b-2 focus:outline-none"
              value={modifiedCollectInfoData.collect_person_cnt}
              onChange={(e) => {
                setModifiedCollectInfoData((_Pdata) => {
                  return { ..._Pdata, collect_person_cnt: e.target.value };
                });
              }}
            />
          </div>
        </div>
      </BottomSheet>
      <BottomNavigation isWorker={false} />
    </div>
  );
}

function OurStoreWorkerItem() {
  return (
    // <Link href="/여기에 학생 아이디"> //TODO
    <div className="flex items-center justify-between h-16 px-2 ">
      <div className="flex items-center ">
        <FaUserCircle className="w-10 h-10 mx-1 text-gray-400" />
        <div className="flex flex-col justify-between ml-2">
          <h1 className="font-semibold text-[15px]">알바생 이름</h1>
          <p className=" text-gray-500 text-[13px]">크로아상 - 주방</p>
        </div>
      </div>
      <button className="mr-2 text-sm text-green-400">관리하기</button>
    </div>
    // </Link>
  );
}
