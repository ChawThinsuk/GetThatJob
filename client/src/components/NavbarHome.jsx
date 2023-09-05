import logoutlogo from "../../img/logout.png"
import logo from "../assets/gtj-logo 1.svg";
import { useAuth } from "../contexts/authentication";
export const NavbarHomepage = () => {
  const {logout} = useAuth()
  return <div className="bg-[#E1E2E1]">
    <div id="logo" className="flex items-center pt-[36px] pl-[24px]">
      <img className="object-contain " src={logo} alt="logos" />
    </div>
    <div>
      <div className="flex flex-rows justify-center items-center w-full" onClick={() => {logout()}}>
        <img src={logoutlogo} />
        <p>Log out</p>
      </div>
    </div>
  </div>
};
