import BottomNavigation from "../../components/BottomNavigation";

export default function EmployerCalcMoney() {
  return (
    <div className="pb-24 font-pretendard">
      <header className="px-5 mt-12 mb-4">
        <h1 className="text-4xl font-bold ">정산</h1>
      </header>

      <section className="px-6 mt-6">
        <div className="h-[100px] rounded-2xl flex items-center bg-white px-2 py-5 divide-x">
          <div className="flex flex-col items-center justify-between flex-grow h-full ">
            <p className="text-xs text-gray-500">근로자</p>
            <h1 className="text-3xl font-semibold">3명</h1>
          </div>
          <div className="flex flex-col items-center justify-between flex-grow h-full">
            <p className="text-xs text-gray-500">미정산</p>
            <h1 className="text-3xl font-semibold">3명</h1>
          </div>
          <div className="flex-grow-[1.5] h-full flex flex-col justify-between items-center">
            <p className="text-xs text-gray-500">이번달 인건비</p>
            <h1 className="text-[21px] font-semibold">2,623,200원</h1>
          </div>
        </div>
      </section>

      <section className="px-6 mt-6">
        <p className="font-semibold text-gray-500 ">미 정산</p>
        <NotCalcItem />
        <NotCalcItem />
        <NotCalcItem />
      </section>
      <BottomNavigation isWorker={false} />
    </div>
  );
}

function NotCalcItem() {
  return (
    <div className="h-[140px] bg-white rounded-2xl my-3">
      <div className="flex flex-col px-4 py-5">
        <p className="text-lg font-bold">김홍록</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-[14px] text-gray-400">
            <p>시급 9,160원</p>
            <p>근로시간 9,160원</p>
            <p>추가수당 9,160원</p>
          </div>
          <p className="relative text-lg font-semibold -top-2 right-1">
            총 874,4000원
          </p>
        </div>
        <div className="flex justify-end">
          <p className="text-xs font-semibold text-gray-400">
            터치하여 정산하기
          </p>
        </div>
      </div>
    </div>
  );
}
