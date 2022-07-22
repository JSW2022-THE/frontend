import BottomNavigation from "../../components/BottomNavigation";
import styles from "../../styles/pages/employer/home/home.module.css";
import Header from "../../components/Header";
import TwoInfoBox from "../../components/employer/home/TwoInfoBox";
import GoodJobBanner from "../../components/employer/home/GoodJobBanner";
import { useEffect } from "react";
import axios from "axios";
import IntroducePanel from "../../components/employer/home/IntroducePanel";

export default function EmployerHome() {
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:2000/api/store/getInfoByOwnerId",
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <div className={styles.body_wrapper}>
      <Header />
      <TwoInfoBox />
      <GoodJobBanner />
      <IntroducePanel />
      <BottomNavigation isWorker={false} />
    </div>
  );
}
