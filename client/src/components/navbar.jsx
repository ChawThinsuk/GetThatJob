import { Button, Stack } from "@chakra-ui/react";
import logo from "../assets/gtj-logo 1.svg";
import icons1 from "../assets/user-add-line.svg";
import icons2 from "../assets/user-received-2-line.svg";
import { Link } from "react-router-dom";

const navItem = [
  {
    title: "SIGN UP",
    icon: icons1,
    linkTo: "/register",
  },
  {
    title: "LOGIN",
    icon: icons2,
    linkTo: "/login",
  },
];

function Navbar() {
  return (
    <nav className="flex w-[100%] h-[3.5rem] justify-center items-center shrink-0 p-[0.75rem_7.5rem] shadow-lg">
      <div className="flex w-[100%] h-[2rem] p-[0rem_0rem;] justify-between items-center self-stretch shrink-0">
        <Link to="/">
          <div id="logo" className=" flex items-center">
            <img className="object-contain " src={logo} alt="logos" />
          </div>
        </Link>
        <Stack spacing={3} direction="row" align="center">
          {navItem.map((item) => (
            <Link key={item.title} to={item.linkTo}>
              <Button
                key={item.title}
                paddingBottom="12px"
                paddingTop="12px"
                variant="outline"
                border="1px"
                borderColor="#f48fb1"
                size="sm"
                borderRadius="1rem"
                textColor="rgba(97, 97, 97, 1)"
                gap="0.5rem"
                width="129px"
                height="40px"
                fontFamily="Inter"
                _hover={{background: "#F48FB126"}}
              >
                <img className="object-fill" src={item.icon} alt={item.title} />{" "}
                {item.title}
              </Button>
            </Link>
          ))}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;
