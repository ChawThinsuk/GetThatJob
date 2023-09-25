import { useAuth } from "../contexts/Authorization";
import { HomepageProfessional } from "./HomepageProfessional";
import { HomepageRecruiter } from "./HomepageRecruiter";
import { HomepageAdmin } from "./HomepageAdmin";

function AuthenticatedApp() {
  const { state } = useAuth();
  console.log(state);

  return (
    <div className="App flex flex-col relative">
      {state.userType === "PROFESSIONAL" && <HomepageProfessional />}
      {state.userType === "RECRUITER" && <HomepageRecruiter />}
      {state.userType === "ADMIN" && <HomepageAdmin />}
    </div>
  );
}

export default AuthenticatedApp;
