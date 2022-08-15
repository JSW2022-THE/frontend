import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function PwaPage() {
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
  return (
    <div className=" font-pretendard">
      <section className="px-10 mt-24">
        <h1 className="text-3xl font-semibold ">스마트한</h1>
        <h1 className="mt-1 text-3xl font-semibold">학생 구직 플랫폼</h1>
        <h1 className="mt-1 text-4xl font-bold text-green-600">굿잡</h1>
        <img src="/splash.svg" className="mt-24" />
      </section>
      <section className="fixed p-6 bottom-16">
        <img src="/kakao_login.svg" className=" rounded-3xl" />
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
        <img src="/splash.svg" className="mt-24" />
      </section>
    </div>
  );
}
