import { createContext, useState, useContext } from "react";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [test, setTest] = useState("Hello");
  return (<UserContext.Provider value={{test}}>{children}</UserContext.Provider>);
};

const useGlobalContext = () => {
  return useContext(UserContext);
};

export { ContextProvider, useGlobalContext };
