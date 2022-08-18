import { useState } from "react";
import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Header from "../../components/Header";
import axios from "axios";

export default function WorkerMyResume() {
  const [resumeData, setResumeData] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/resume/getMyResume",
      withCredentials: true,
    })
      .then((res) => {
        setResumeData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="font-pretendard">
      <Header />
      <h1 className="px-6 mt-2 text-3xl font-semibold">이력서</h1>
      <div className="px-6 mt-6">
        <FaUserCircle className="w-16 h-16 mb-3 text-gray-400" />
        <span className="flex text-lg font-semibold">
          <p className="text-gray-400">이름</p>
          <p className="ml-3">{resumeData ? resumeData.name : "불러오는중"}</p>
        </span>
        <span className="flex mt-3 text-lg font-semibold">
          <p className="text-gray-400">생년원일</p>
          <p className="ml-3">
            {resumeData ? resumeData.date_of_birth : "불러오는중"}
          </p>
        </span>
        <span className="flex mt-3 text-lg font-semibold">
          <p className="text-gray-400">주소</p>
          <p className="ml-3">
            {resumeData ? resumeData.address : "불러오는중"}
          </p>
        </span>
        <span className="flex mt-3 text-lg font-semibold">
          <p className="w-20 text-gray-400">기타</p>
          <p className="ml-3">{resumeData ? resumeData.etc : "불러오는중"}</p>
        </span>
        <button className="w-full h-12 mt-10 font-semibold text-white bg-blue-500 rounded-2xl">
          이력서 수정하기
        </button>
      </div>
    </div>
  );
}
