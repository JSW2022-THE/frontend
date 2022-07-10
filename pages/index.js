import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  /* 임시 라우터 */
  useEffect(() => {
    router.push("/worker/home");
  }, []);
  return (
    <>
      <h1>랜딩페이지가 될곳</h1>
    </>
  );
}
