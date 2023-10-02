import { NavbarHomepage } from "../components/NavbarHome";
import { useAuth } from "../contexts/Authorization";
import { Routes, Route } from "react-router-dom";
import { FindThatJob } from "../components/Professional/FindThatJob";
import { Following } from "../components/Professional/Following";
import { ProfessionalProfile } from "../components/Professional/ProfessionalProfile";
import { YourApplication } from "../components/Professional/YourApplication";
import { JobDetail } from "../components/Professional/JobDetail";
import { ApplicationList } from "../components/Professional/ApplicationList";
import HelpButton from "../components/Support-chat/HelpButton";

export const HomepageProfessional = () => {
  const { state } = useAuth();
  return (
    <>
      <div className="grid grid-cols-[17.75%_82.25%] min-w-[1840px] min-h-[970px]">
        <NavbarHomepage userType={state.userType} />
        <Routes>
          <Route path="/" element={<FindThatJob />} />
          <Route path="/:id" element={<JobDetail />} />
          <Route path="/follow" element={<Following />} />
          <Route path="/proprofile" element={<ProfessionalProfile />} />
          <Route path="/apply" element={<ApplicationList />} />
          <Route path="/apply/:job_id" element={<YourApplication />} />
          <Route path="*" element={<FindThatJob />} />
        </Routes>
      </div>
      <HelpButton email={state.email} />
    </>
  );
};
