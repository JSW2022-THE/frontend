import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ModifyUserDataBS(props) {
  const [modifiedUserData, setModifiedUserData] = useState(props.userData);
  const [modifiedStoreData, setModifiedStoreData] = useState(props.storeData);
  const [modifyChecker, setModifyChecker] = useState({});
  const [POSTSucess, setPOSTSucess] = useState({
    userData: false,
    storeData: false,
  });

  const handleStoreDataChange = (e) => {
    setModifiedStoreData({
      ...modifiedStoreData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUserDataChange = (e) => {
    setModifiedUserData({
      ...modifiedUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePOSTtoServer = async () => {
    if (
      modifyChecker.userData === "noData" &&
      modifyChecker.storeData === "noData"
    ) {
      alert("변경사항이 없습니다.");
    } else {
      if (modifyChecker.userData === true) {
        axios({
          method: "POST",
          url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user/modifyUserInfo",
          data: modifiedUserData,
          withCredentials: true,
        })
          .then((res) => {
            setPOSTSucess((_Pdata) => {
              return { ..._Pdata, userData: true };
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (modifyChecker.storeData === true) {
        axios({
          method: "POST",
          url:
            process.env.NEXT_PUBLIC_BACKEND_URL + "/api/store/modifyStoreInfo",
          data: modifiedStoreData,
          withCredentials: true,
        })
          .then((res) => {
            setPOSTSucess((_Pdata) => {
              return { ..._Pdata, storeData: true };
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  //변경사항 있나 체크하는 로직
  useEffect(() => {
    //유저데이터 변경사항 있을 때
    if (modifiedUserData !== props.userData) {
      setModifyChecker((_Pdata) => {
        return { ..._Pdata, userData: true };
      });
      setPOSTSucess((_Pdata) => {
        return { ..._Pdata, userData: false };
      });
      console.log("유저 데이터 변경사항 O");
    } else {
      setModifyChecker((_Pdata) => {
        return { ..._Pdata, userData: "noData" };
      });
      setPOSTSucess((_Pdata) => {
        return { ..._Pdata, userData: "noData" };
      });
      console.log("유저 데이터 변경사항 X");
    }

    //스토어데이터 변경사항 있을 때
    if (modifiedStoreData !== props.storeData) {
      setModifyChecker((_Pdata) => {
        return { ..._Pdata, storeData: true };
      });
      setPOSTSucess((_Pdata) => {
        return { ..._Pdata, storeData: false };
      });
      console.log("스토어 데이터 변경사항 O");
    } else {
      setModifyChecker((_Pdata) => {
        return { ..._Pdata, storeData: "noData" };
      });
      setPOSTSucess((_Pdata) => {
        return { ..._Pdata, storeData: "noData" };
      });
      console.log("스토어 데이터 변경사항 X");
    }
  }, [modifiedUserData, modifiedStoreData]);
  //axios 요청 후 POSTSucess 값에 따라 모달창을 닫아주기위한 로직
  useEffect(() => {
    if (POSTSucess.userData === true && POSTSucess.storeData === true) {
      props.handleClose();
      props.setUserData(modifiedUserData);
      props.setStoreData(modifiedStoreData);
      console.log("스토어, 유저 정보 모두 변경 완료됨");
    }
    if (POSTSucess.userData === "noData" && POSTSucess.storeData === true) {
      props.handleClose();
      props.setStoreData(modifiedStoreData);
      console.log("스토어 정보만 변경 완료됨");
    }
    if (POSTSucess.userData === true && POSTSucess.storeData === "noData") {
      props.handleClose();
      props.setUserData(modifiedUserData);
      console.log("유저 정보만 변경 완료됨");
    }
  }, [POSTSucess]);

  return (
    <BottomSheet
      open={props.open}
      onDismiss={() => {
        props.handleClose();
      }}
      header={<header className="font-bold">내 정보 수정</header>}
      footer={
        <footer className="flex justify-between">
          <button
            onClick={() => {
              props.handleClose();
            }}
            className="w-full h-12 mx-2 bg-slate-200 rounded-3xl"
          >
            취소
          </button>
          <button
            onClick={handlePOSTtoServer}
            className="w-full h-12 mx-2 text-green-700 bg-green-300 rounded-3xl"
          >
            수정
          </button>
        </footer>
      }
    >
      <div className="p-4 ">
        {modifiedStoreData ? (
          <div className="mb-10">
            <header className="text-xl font-semibold">가게 정보수정</header>
            <div className="flex justify-between w-[300px] mt-4 items-center">
              <p className="text-sm text-gray-400">가게 이름</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedStoreData.name}
                name={"name"}
                onChange={handleStoreDataChange}
              />
            </div>
            <div className="flex justify-between w-[300px] mt-3">
              <p className="text-sm text-gray-400">가게 설명</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedStoreData.description}
                name={"description"}
                onChange={handleStoreDataChange}
              />
            </div>
            <div className="flex justify-between w-[300px] mt-3">
              <p className="text-sm text-gray-400">가게 전화번호</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedStoreData.phone_number}
                name={"phone_number"}
                onChange={handleStoreDataChange}
              />
            </div>
            <div className="flex justify-between w-[300px] mt-3">
              <p className="text-sm text-gray-400">가게 주소</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedStoreData.address}
                name={"address"}
                onChange={handleStoreDataChange}
              />
            </div>
          </div>
        ) : null}

        {modifiedUserData ? (
          <div>
            <header className="text-xl font-semibold ">내 정보수정</header>
            <div className="flex justify-between w-[300px] mt-4 items-center">
              <p className="text-sm text-gray-400">이름</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedUserData.name}
                name={"name"}
                onChange={handleUserDataChange}
              />
            </div>
            <div className="flex justify-between w-[300px] mt-3">
              <p className="text-sm text-gray-400">전화번호</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedUserData.phone_number}
                name={"phone_number"}
                onChange={handleUserDataChange}
              />
            </div>
            <div className="flex justify-between w-[300px] mt-3">
              <p className="text-sm text-gray-400">나이</p>
              <input
                className="ml-6 text-gray-600 border-b-2 focus:outline-none"
                value={modifiedUserData.age}
                name={"age"}
                onChange={handleUserDataChange}
              />
            </div>
          </div>
        ) : null}
      </div>
    </BottomSheet>
  );
}
