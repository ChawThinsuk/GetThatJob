import { useAuth } from "../contexts/Authorization";
import icon from "../assets/gtj-logo 1.svg";
import search from "../assets/NavbarHome/search.svg";
import paper from "../assets/NavbarHome/paper.svg";
import follow from "../assets/NavbarHome/follow.svg";
import user from "../assets/NavbarHome/profile.svg";
import bag from "../assets/NavbarHome/bag.svg";
import doc from "../assets/NavbarHome/doc.svg";
import money from "../assets/FindThatJob/money2.svg";
import time from "../assets/FindThatJob/time.svg";
import logoutlogo from "../assets/NavbarHome/logout.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const NavbarHomepage = () => {
  const urlArray = [];
  urlArray.push(window.location.href.split("/")[3]);
  // console.log(window.location.href);
  const navigate = useNavigate();
  const [selectNav, setSelectNav] = useState(`/${urlArray[0]}`);
  const { logout, state } = useAuth();
  const professionalNav = [
    { logo: search, title: "Find that job", url: "/" },
    { logo: paper, title: "Your application", url: "/apply" },
    { logo: follow, title: "Following", url: "/follow" },
    { logo: user, title: "Profile", url: "/proprofile" },
  ];
  const recruiterNav = [
    { logo: bag, title: "Job Postings", url: "/" },
    { logo: doc, title: "Create New Job", url: "/createjob" },
    { logo: user, title: "Profile", url: "/recruitprofile" },
    { logo: money, title: "Ads", url: "/ads" },
    { logo: time, title: "Ads History", url: "/history" },
  ];

  return (
    <div className="bg-[#E1E2E1] w-full">
      <div
        id="logo"
        className="flex items-center pt-[32px] pl-[32px] my-[16px]"
      >
        <img className="object-contain w-[181px] " src={icon} alt="logos" />
      </div>
      <div className="pt-4">
        {(state.userType === "PROFESSIONAL"
          ? professionalNav
          : recruiterNav
        ).map((navButton) => {
          return (
            <Link
              key={navButton.title}
              to={navButton.url}
              onClick={() => setSelectNav(navButton.url)}
            >
              <div
                className={`flex flex-rows justify-start items-center w-full h-[64px] p-4 pl-[32px] ${
                  navButton.url === selectNav && "bg-[#f5f5f6]"
                }`}
              >
                <img src={navButton.logo} className="p-2" />
                <p className=" text-[21.33px] text-[#616161] font-[Inter]">
                  {navButton.title}
                </p>
              </div>
            </Link>
          );
        })}
        <div
          className="flex flex-rows justify-start font-[Inter] items-center w-full h-[64px] p-4 pl-[32px] hover:cursor-pointer"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <img src={logoutlogo} className="p-2" />
          <p className="font-[Inter] text-[21.33px] text-[#616161] ">Log out</p>
        </div>
      </div>
    </div>
  );
};
