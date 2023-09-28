import React from "react";
import logoutlogo from "../../assets/NavbarHome/logout.svg";
import icon from "../../assets/gtj-logo 1.svg";
import { ChatEngine } from "react-chat-engine";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Authorization";

function AdminChat() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <>
      <div>
        <div className="w-full flex flex-row justify-between pl-[30px] pr-[30px] bg-[#E1E2E1] border-[1px] rounded-md">
          <img src={icon} alt="logos" />
          <div
            className="flex flex-rows justify-start font-[Inter] items-center h-[64px] p-4 pl-[32px] hover:cursor-pointer"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <img src={logoutlogo} className="p-2" />
            <p className="font-[Montserrat] text-[15px] text-[#616161] ">
              Log out
            </p>
          </div>
        </div>
        <div>
          <ChatEngine
            projectID={"a760508d-04d8-4331-84b7-781fc9371f90"}
            userName="GetThatJobAdmin"
            userSecret="GetThatJobAdmin"
            height="calc(94.5vh - 12px)"
          />
        </div>
      </div>
    </>
  );
}

export default AdminChat;
