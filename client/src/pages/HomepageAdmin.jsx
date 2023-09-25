import { Routes, Route } from "react-router-dom";
import AdminChat from "../components/Support-chat/adminChat";
import { NavbarHomepage } from "../components/NavbarHome";
import { useAuth } from "../contexts/Authorization";

export const HomepageAdmin = () => {
    const { state } = useAuth();
  return (
    <>
      <NavbarHomepage userType={state.userType} />
      <Routes>
        <Route path="/" element={<AdminChat />} />
      </Routes>
    </>
  );
};
