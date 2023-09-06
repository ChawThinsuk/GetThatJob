import { useAuth } from "../contexts/authentication";
import icon from "../assets/gtj-logo 1.svg";
import search from "../../img/search.png";
import paper from "../../img/paper.png";
import follow from "../../img/follow.png";
import user from "../../img/user.png";
import bag from "../../img/bag.png";
import doc from "../../img/doc.png";
import logoutlogo from "../../img/logout.png";
import { Link } from "react-router-dom";

export const NavbarHomepage = () => {
  const {logout, state} = useAuth();
  // const navButton = [{logo, title, url}]
  const professionalNav = [
    { logo: search, title: 'Find that job', url: '/find' },
    { logo: paper, title: 'Your application', url: '/app' },
    { logo: follow, title: 'Following', url: '/'},
    { logo: user, title: 'profile', url: '/'}
    ];
  const recruiterNav = [
    { logo: bag, title: 'Job Postings', url: '/' },
    { logo: doc, title: 'Create New Job', url: '/' },
    { logo: user, title: 'profile', url: '/'},
    ];

  return <div className="bg-[#E1E2E1]">
    <div id="logo" className="flex items-center pt-[36px] pl-[24px]">
      <img className="object-contain " src={icon} alt="logos" />
    </div>
    <div className="pt-4">
      {(state.userType === 'PROFESSIONAL' ? professionalNav : recruiterNav).map((navButton) => {
        return (
          <Link to={navButton.url}>
          <div className="flex flex-rows justify-start items-center w-full h-[48px] p-4 ">
            <img src={navButton.logo} className="p-2"/>
            <p>{navButton.title}</p>
          </div>
          </Link>
        )
      })}
      <div className="flex flex-rows justify-start items-center w-full h-[48px] p-4" onClick={() => {logout()}}>
        <img src={logoutlogo} className="p-2"/>
        <p>Log out</p>
      </div>
    </div>
  </div>
};
