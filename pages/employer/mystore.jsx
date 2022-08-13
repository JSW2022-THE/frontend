import BottomNavigation from "../../components/BottomNavigation";
import Link from "next/link";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";

export default function EmployerMyStore() {
  return (
    <div className="pb-24 font-pretendard">
      <header className="px-5 mt-12 mb-4">
        <h1 className="text-4xl font-bold ">내 가게</h1>
      </header>

      <section className="px-6 mt-6">
        <p className="text-lg font-semibold text-gray-500 ">
          모집상태 : 모집중
        </p>
        <div className="h-[80px] bg-white rounded-2xl my-2 flex justify-between items-center p-6">
          <div>
            <h1 className="font-bold">맛있는 크로아상</h1>
            <p className="text-sm font-semibold text-gray-400">지원자 {2}명</p>
          </div>
          <label
            for="default-toggle"
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              onChange={(e) => {
                console.log(e.target.checked);
              }}
              id="default-toggle"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-green-400"></div>
          </label>
        </div>
        <div className="p-4 my-2 bg-white rounded-2xl">
          <span className="flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">소개글</h1>
            <p className="text-xs text-gray-400">여기를 눌러 수정하기</p>
          </span>
          <p className="mt-2 ">
            안녕하세요, 저희 가게는 24시간 운영되고 있는 음식 점입니다. 임금은
            최저임금이며, 자세한 내용은 아래 항목들을 참고해주세요 :)
          </p>
        </div>
        <div className="p-4 my-2 bg-white rounded-2xl">
          <span className="flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">모집 정보</h1>
            <p className="text-xs text-gray-400">여기를 눌러 수정하기</p>
          </span>
          <div className="leading-[22px] mt-3">
            <span className="flex">
              <p className="text-gray-500">시급</p>
              <p className="ml-2 font-semibold">10000원</p>
            </span>
            <span className="flex">
              <p className="text-gray-500">포지션</p>
              <p className="ml-2 font-semibold">주방보조 서빙 배달</p>
            </span>
            <span className="flex">
              <p className="text-gray-500">근무시간</p>
              <p className="ml-2 font-semibold">5시간 (오후/오전 선택)</p>
            </span>
            <span className="flex">
              <p className="text-gray-500">모집인원</p>
              <p className="ml-2 font-semibold">3명</p>
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
              <p className=" text-[#3E8752] ml-1">2</p>
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
