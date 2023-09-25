import React, { useRef, useState } from "react";
import { ChatEngineWrapper, Socket, ChatFeed,ChatSocket,NewMessageForm } from "react-chat-engine";
import axios from "axios";

function UserChat() {
  const [user, setUser] = useState();
  const [chat, setChat] = useState();
  return (
    <>
      {user && chat ? (
         <div className="flex flex-col justify-center items-center w-[450px] h-[500px] border-[1px] fixed bottom-[150px] right-[35px]">
        <ChatView user={user} chat={chat} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-[450px] h-[500px] border-[1px] fixed bottom-[150px] right-[35px]">
          <p>Welcome to our support 👋</p>
          <Register setChat={setChat} setUser={setUser} />
          <p>Enter your email to get started</p>
        </div>
      )}
    </>
  );
}
function Register({ setUser, setChat }) {
  const inputEmail = useRef();

  function register() {
    let email = inputEmail.current.value;
    const callback_created = (user) => {
      setUser(user);
      getOrCreateChat((chat) => {
        setChat(chat);
      }, user.username);
    };
    getOrCreateUser(callback_created, email);
  }
  return (
    <>
      <input
        placeholder="Input you email"
        ref={inputEmail}
        className="rounded-sm text-center"
      />
      <button onClick={register}>Help</button>
    </>
  );
}
function ChatView({ user, chat }) {
  return (
    <ChatEngineWrapper>
      <ChatSocket
        projectID={"a760508d-04d8-4331-84b7-781fc9371f90"}
        chatID={chat?.id}
        chatAccessKey={chat?.access_key}
        senderUsername={user?.username}
      />
      <ChatFeed />    
    </ChatEngineWrapper>
  );
}
function getOrCreateChat(callback, email) {
  axios
    .put(
      "https://api.chatengine.io/chats/",
      { usernames: [email, "GetThatJobAdmin"], is_direct_chat: true },
      {
        headers: {
          "Project-ID": "a760508d-04d8-4331-84b7-781fc9371f90",
          "User-Name": "GetThatJobAdmin",
          "User-Secret": "GetThatJobAdmin",
        },
      }
    )
    .then((r) => callback(r.data))
    .catch((e) => console.log("Get or create chat error", e));
}
function getOrCreateUser(callback, email) {
  console.log(email);
  axios
    .put(
      "https://api.chatengine.io/users/",
      { username: email, secret: email },
      { headers: { "Private-Key": "38a464c5-c7b3-4a89-8eff-b8b86b160452" } }
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
