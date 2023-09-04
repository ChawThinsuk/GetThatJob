import { Button, Stack } from "@chakra-ui/react";
import logo from "../assets/gtj-logo 1.svg";
import icons1 from "../assets/user-add-line.svg";
import icons2 from "../assets/user-received-2-line.svg";

const navItem = [
  {
    title: "SIGN UP",
    icon: icons1,
  },
  {
    title: "LOGIN",
    icon: icons2,
  },
];

function Navbar() {
  return (
    <nav className="flex w-[100%] h-[3.5rem] justify-center items-center shrink-0 bg-white shadow-[0px_2px_7px_0px] shadow-slate-300 p-[0.75rem_7.5rem] ">
      <div className="flex w-[100%] h-[2rem] p-[0rem_0rem;] justify-between items-center self-stretch shrink-0">
        <div id="logo" className=" flex items-center">
          <img className="object-contain " src={logo} alt="logos" />
        </div>
        <Stack spacing={3} direction="row" align="center">
          {navItem.map((item) => (
            <Button
              key={item.title}
              paddingBottom="1rem"
              paddingTop="1rem"
              variant="outline"
              border="2px"
              borderColor="#f48fb1"
              size="sm"
              borderRadius="1rem"
              textColor="rgba(97, 97, 97, 1)"
              gap="0.5rem"
            >
              <img className="object-fill" src={item.icon} alt={item.title} />{" "}
              {item.title}
            </Button>
          ))}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;