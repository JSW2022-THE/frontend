import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";

export default function WorkerHome() {
  return (
    <>
      <Header />
      <BottomNavigation isWorker={true} />
    </>
  );
}
