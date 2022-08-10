import BottomNavigation from "../../components/BottomNavigation";
import ChatList from "../../components/chat/ChatList";

export default function EmployerChat() {
  return (
    <div className="font-pretendard">
      <header className="px-5 mt-12 mb-4">
        <h1 className="text-4xl font-bold ">채팅</h1>
      </header>
      <ChatList />
      <BottomNavigation isWorker={false} />
    </div>
  );
}
