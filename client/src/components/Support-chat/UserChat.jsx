import React, { useRef, useState, useEffect } from "react";
import { ChatEngineWrapper, ChatFeed, ChatSocket } from "react-chat-engine";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import developer from "../../assets/support-chat/dev_icon.svg";

function UserChat(props) {
  const [user, setUser] = useState();
  const [chat, setChat] = useState();
  return (
    <>
      {user && chat ? (
        <ChatView user={user} chat={chat} />
      ) : (
        <Register
          setChat={setChat}
          setUser={setUser}
          user_email={props.email}
        />
      )}
    </>
  );
}
function Register({ setUser, setChat, user_email }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user_email && handleRegister(user_email);
  }, [user_email]);

  const inputEmail = useRef();

  function handleRegister(p_email) {
    setLoading(true);
    let email = p_email || inputEmail.current.value;
    const callback_created = (user) => {
      // console.log("test",user);
      getOrCreateChat((chat) => {
        setChat(chat);
        setUser(user);
        setLoading(false);
      }, user.username);
    };
    getOrCreateUser(callback_created, email);
  }
  if (loading) {
    return (
      <FormBox>
        <Spinner color="pink.200" size="lg" />
      </FormBox>
    );
  }
  if (user_email) {
    return null;
  }

  return (
    <>
      <FormBox>
        <img src={developer} />
        <p>Welcome to our support 👋</p>
        <input
          placeholder="Your email 💬"
          ref={inputEmail}
          className="rounded-md text-center w-[350px] h-[50px] font-medium text-[#3f3f46] borde r-none outline-none"
        />
        <button onClick={() => handleRegister()} className="border-[1px] w-[70px] h-[30px] rounded-md hover:bg-[#d0cde0] opacity-90">Help</button>
        <p>Enter your email to get started</p>
        </FormBox>
    </>
  );
}
function ChatView({ user, chat }) {
  return (
    <>
      <div className="flex flex-col w-[450px] h-[600px] fixed bottom-[130px] right-[35px]  border-[0.5px]">
        <ChatEngineWrapper>
          <ChatSocket
            projectID={import.meta.env.VITE_PROJECT_ID}
            chatID={chat?.id}
            chatAccessKey={chat?.access_key}
            senderUsername={user?.username}
            offset={7}
          />
          <ChatFeed />
        </ChatEngineWrapper>
      </div>
    </>
  );
}
function getOrCreateChat(callback, email) {
  axios
    .put(
      "https://api.chatengine.io/chats/",
      { usernames: [email, "GetThatJobAdmin"], is_direct_chat: true },
      {
        headers: {
          "Project-ID":import.meta.env.VITE_PROJECT_ID,
          "User-Name": "GetThatJobAdmin",
          "User-Secret": "GetThatJobAdmin",
        },
      }
    )
    .then((r) => callback(r.data))
    .catch((e) => console.log("Get or create chat error", e));
}
function getOrCreateUser(callback, email) {
  axios
    .put(
      "https://api.chatengine.io/users/",
      { username: email, secret: email },
      { headers: { "Private-Key": import.meta.env.VITE_PRIVATE_KEY } }
    )
    .then((r) => callback(r.data))
    .catch((e) => console.log("Get or create user error", e));
}
const styles = {
  chatEngineWindow: {
    width: "100%",
    backgroundColor: "#fff",
  },
};
export default UserChat;

const FormBox = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[450px] h-[600px] border-[1px] fixed bottom-[130px] right-[35px] rounded-xl bg-[#fafafa] font-[Montserrat] text-[#3f3d55] gap-4 font-bold shadow-lg opacity-90 animate duration-150">
      {children}
    </div>
  );
};
