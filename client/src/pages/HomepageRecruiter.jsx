import { NavbarHomepage } from "../components/NavbarHome";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/Authorization";
import { CreateNewJob } from "../components/Recruiter/CreateNewJob";
import JobPosting from "../components/Recruiter/JobPosting";
import EditJob from "../components/Recruiter/EditJob";
import { RecruiterProfile } from "../components/Recruiter/RecruiterProfile";
import ShowJobPosting from "../components/Recruiter/ShowJobPosting";
import { RecruiterProvider } from "../contexts/recruiterPage1-2";
import AdminChat from "../components/Support-chat/adminChat";
import HelpButton from "../components/Support-chat/HelpButton";
import Ads from "../components/Recruiter/Advertisement/Ads";
import Success from "../components/Recruiter/Advertisement/Success";
import Cancel from "../components/Recruiter/Advertisement/Cancel";

export const HomepageRecruiter = () => {
  const { state } = useAuth();
  return (
    <>
    <RecruiterProvider>
      <div className="grid grid-cols-[17.75%_81.25%] min-w-[1840px] min-h-[940px]">
        <NavbarHomepage userType={state.userType} />
        <Routes>
          <Route path="/" element={<JobPosting id={state.userID} />} />
          <Route path="/showjobposting/:id" element={<ShowJobPosting />} />
          <Route path="/createjob" element={<CreateNewJob />} />
          <Route path="/editjob/:id" element={<EditJob />} />
          <Route path="/recruitprofile" element={<RecruiterProfile />} />
          <Route path="*" element={<JobPosting />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/ads/success" element={<Success />} />
          <Route path="/ads/cancel" element={<Cancel />} />
        </Routes>
      </div>
    <HelpButton email={state.email}/>
    </RecruiterProvider>
    </>
  );
};
