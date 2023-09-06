import { createContext, useState, useContext } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  // Test Context
  const [test, setTest] = useState("Hello");

  // register context
  const [userType, setUserType] = useState("PROFESSIONAL");
  const [registerPage, setRegisterPage] = useState(1);
  const [recruiterRegisterPage, setRecruiterRegisterPage] = useState(1);

  // chakra style
  const customTextStyle = {
    fontFamily: "Inter",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  };

  return (
    <UserContext.Provider
      value={{
        registerPage,
        setRegisterPage,
        recruiterRegisterPage,
        setRecruiterRegisterPage,
        customTextStyle,
        userType,
        setUserType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(UserContext);
};

export { ContextProvider, useGlobalContext };
