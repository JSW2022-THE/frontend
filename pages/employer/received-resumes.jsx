import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import { FaUserCircle } from "react-icons/fa";

export default function EmployerReceivedResumes() {
  const router = useRouter();
  const [resumes, setResumes] = useState();

  const store_uuid = router.query.store_uuid; //store_uuid
  const employer_uuid = router.query.employer_uuid; //employer_uuid

  const getResumes = () => {
    axios({
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/resume/getStoreReceivedResumes",
      params: { store_uuid: store_uuid },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        setResumes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      getResumes();
    }
  }, [router.isReady]);

  return (
    <div className="font-pretendard">
      <Header />
      <h1 className="px-6 text-2xl font-semibold">받은 이력서들</h1>
      <div className="p-6">
        {resumes
          ? resumes.map((_data) => {
              return (
                <ResumeItem
                  key={_data.resume_uuid}
                  resumeData={_data}
                  getResumes={getResumes}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

function ResumeItem(props) {
  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-3xl h-ful">
      <div className="l">
        <span className="flex items-center">
          <FaUserCircle className="w-16 h-16 text-gray-300" />
          <div className="ml-4">
            <span className="flex font-semibold">
              <p className="text-gray-400">이름</p>
              <p className="ml-2">{props.resumeData.name}</p>
            </span>
            <span className="flex font-semibold">
              <p className="text-gray-400">생년월일</p>
              <p className="ml-2">{props.resumeData.date_of_birth}</p>
            </span>
            <span className="flex font-semibold">
              <p className="text-gray-400">전화번호</p>
              <p className="ml-2">{props.resumeData.phone_number}</p>
            </span>
          </div>
        </span>
        <div className="flex flex-col mt-1 mb-3 font-semibold">
          <p className="text-gray-400">기타</p>
          <p className="">{props.resumeData.etc}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            axios({
              method: "POST",
              url:
                process.env.NEXT_PUBLIC_BACKEND_URL +
                "/api/resume/changeReceivedResumeState",
              data: { resume_uuid: props.resumeData.resume_uuid },
              withCredentials: true,
            })
              .then((res) => {
                alert(props.resumeData.name + "님의 이력서 삭제 완료");
                props.getResumes();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="w-full h-12 mx-2 font-bold text-white bg-red-400 rounded-2xl"
        >
          삭제
        </button>
        <button className="w-full h-12 mx-2 font-bold text-white bg-green-400 rounded-2xl">
          근로계약서 작성
        </button>
      </div>
    </div>
  );
}
