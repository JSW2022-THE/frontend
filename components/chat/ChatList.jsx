import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

import Link from "next/link";

export default function ChatList() {
  const [chatRoomDatas, setChatRoomDatas] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/chat/getChatRooms",
      withCredentials: true,
    })
      .then((res) => {
        setChatRoomDatas(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <section className="px-3 divide-y divide-gray-300 divide-solid">
      {chatRoomDatas.map((_data) => {
        return <ChatItem key={_data.room_id} chatData={_data} />;
      })}
    </section>
  );
}

function ChatItem(props) {
  return (
    <Link href={"/chat/" + props.chatData.room_id}>
      <div className="flex items-center justify-between w-full h-16 px-2 cursor-pointer">
        <div className="flex items-center ">
          <FaUserCircle className="w-10 h-10 mx-1 text-gray-400" />
          <div className="flex flex-col justify-between h-10 mt-1 ml-2">
            <h1 className="font-semibold ">
              {props.chatData.people_names.join(", ")}
            </h1>
            <p className="text-sm text-gray-500">
              {props.chatData.recent_msg
                ? props.chatData.recent_msg
                : "최근 대화 없음"}
            </p>
          </div>
        </div>
        <div>
          <p className="mr-2 text-sm text-gray-400">
            {props.chatData.recent_msg_at
              ? moment(props.chatData.recent_msg_at).fromNow()
              : null}
          </p>
        </div>
      </div>
    </Link>
  );
}
