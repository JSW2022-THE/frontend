import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url:
        process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/getLoggedInUserInfo",
      withCredentials: true,
    })
      .then((res) => {
        setIsLogin(true);
        console.log("로그인 O");
        setUserType(res.data.type);
      })
      .catch((err) => {
        setIsLogin(false);
        console.log("로그인 X");
        console.log(err);
      });
  }, []);
  return <>{isLogin ? <TypeChecker userType={userType} /> : <Login />}</>;
}

function Login() {
  const router = useRouter();
  const kakaoLoginClick = () => {
    const REST_API_KEY = "c91a830998b9123bba1465043c00c0cf";
    const REDIRECT_URI =
      process.env.NODE_ENV == "development"
        ? "http://localhost:3000/auth/callback"
        : "https://jsw2022.hserver.kr/auth/callback";
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
    router.push(url);
  };
  return (
    <div className=" font-pretendard">
      <section className="px-10 mt-24">
        <h1 className="text-3xl font-semibold ">스마트한</h1>
        <h1 className="mt-1 text-3xl font-semibold">학생 구직 플랫폼</h1>
        <h1 className="mt-1 text-4xl font-bold text-green-600">굿잡</h1>
        <img src="/splash.svg" className="mt-24" />
      </section>
      <section className="fixed w-full max-w-[1024px] p-6 flex justify-center bottom-16">
        <img
          src="/kakao_login.svg"
          className="rounded-3xl"
          onClick={kakaoLoginClick}
        />
      </section>
    </div>
  );
}

function TypeChecker(props) {
  const router = useRouter();

  if (props.userType === "adult") {
    router.push("/employer/home");
  }
  if (props.userType === "teenager") {
    router.push("/worker/home");
  }
  return <SplashPage />;
}

function SplashPage() {
  return (
    <div className=" font-pretendard">
      <section className="px-10 mt-24">
        <h1 className="text-3xl font-semibold ">스마트한</h1>
        <h1 className="mt-1 text-3xl font-semibold">학생 구직 플랫폼</h1>
        <h1 className="mt-1 text-4xl font-bold text-green-600">굿잡</h1>
        <img src="/splash.svg" className="mt-24 " />
      </section>
    </div>
  );
}
