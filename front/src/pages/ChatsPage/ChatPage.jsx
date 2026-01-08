import {useEffect, useState} from "react";
import {getChats} from "../../queryFn/query";
import {useParams} from "react-router-dom";
import {ChatWithParams} from "../../components/chatWithParams/ChatWithParams";
import {ChatWithoutParams} from "../../components/chatWithoutParams/ChatWithoutParams";

export function ChatPage() {
  const [chats, setChats] = useState([]);
  const params = useParams();
  const getAllChats = async () => {
    const data = await getChats();
    if (data.length === 0) {
      return console.log(data);
    }
    setChats(data);
  };

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <>
      {params.chatId ? (
        <ChatWithParams chats={chats} />
      ) : (
        <ChatWithoutParams chats={chats} />
      )}
    </>
  );
}
