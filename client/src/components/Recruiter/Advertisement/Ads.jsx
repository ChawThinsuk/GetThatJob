import JobCardAds from "./JobCardAds.jsx";
import { usePro } from "../../../contexts/Professional.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Ads() {
  const { jobs } = usePro();
  const [budget, setBudget] = useState("");
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <p>Advertising</p>
        <div>
          <div>
            <p>Select your job</p>
            <div>
              {jobs.map((job) => (
                <JobCardAds job={job} key={job.job_id} />
              ))}
            </div>
          </div>
          <div>
            <p>Ads budget</p>
            <form>
              <input onChange={(e) => setBudget(e.target.value)}></input>
            </form>
          </div>
        </div>
        <button>Submit </button>
      </div>
    </div>
  );
}
export default Ads;
