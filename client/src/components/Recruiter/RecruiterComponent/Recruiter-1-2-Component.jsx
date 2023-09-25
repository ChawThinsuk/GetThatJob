import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useRecruiterContext } from "../../../contexts/recruiterPage1-2"
import { useGlobalContext } from "../../../contexts/registerContext";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
//Page 1
export function RadioJobPosting() {
  const { jobPostingFilterState, setJobPostingFilterState } =
    useRecruiterContext();
  const { handleDownloadClick } = useGlobalContext();  
  return (
    <div className="pt-[21.33px] text-[#616161] text-[15px] ">
      <p className="text-[11px]">FILTER YOUR JOB POSTINGS</p>
      <div className="flex flex-row mt-[5.33px]">
        <input
          type="radio"
          name="status"
          value="all"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setJobPostingFilterState(e.target.value);
          }}
          checked={jobPostingFilterState === "all"}
        />
        <p className="pl-[5.33px] pr-[16px]">All</p>
        <input
          type="radio"
          name="status"
          value="track"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setJobPostingFilterState(e.target.value);
          }}
          checked={jobPostingFilterState === "track"}
        />
        <p className="pl-[5.33px] pr-[16px]">With candidates on track</p>
        <input
          type="radio"
          name="status"
          value="closed"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setJobPostingFilterState(e.target.value);
          }}
          checked={jobPostingFilterState === "closed"}
        />
        <p className="pl-[5.33px]">Closed</p>
      </div>
    </div>
  );
}
export function CloseJobButton(props) {
  const updateClick = {
    job_user_mark: "closed",
    job_id: props.mark,
  };
  const [isLoading, setIsLoading] = useState(false);
  async function handleClickCloseJob(data) {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:4000/recruiter/job-status",
        data
      );
      await props.refreshData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }
  return (
    <>
      {" "}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-[154.67px] h-[53.36px]">
          <Spinner color="pink.200" size="lg" />
        </div>
      ) : (
        <button
          className="flex flex-row items-center justify-center bg-[#F48FB1] w-[154.67px] h-[53.36px] gap-2 text-white rounded-[21.33px] text-[15px] duration-200 hover:bg-rose-200"
          onClick={() => {
            handleClickCloseJob(updateClick);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group">
              <path
                id="Vector"
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 10.586L14.828 7.757L16.243 9.172L13.414 12L16.243 14.828L14.828 16.243L12 13.414L9.172 16.243L7.757 14.828L10.586 12L7.757 9.172L9.172 7.757L12 10.586Z"
                fill="white"
              />
            </g>
            
          </svg>
          CLOSE
        </button>
      )}
    </>
  );
}
export function ClosedJobButton() {
  return (
    <button className="flex flex-row items-center justify-center bg-[#E1E2E1] w-[169.34px] h-[53.36px] gap-2 text-[#8E8E8E] rounded-[21.33px] text-[15px] duration-1000" disabled>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 10.586L14.828 7.757L16.243 9.172L13.414 12L16.243 14.828L14.828 16.243L12 13.414L9.172 16.243L7.757 14.828L10.586 12L7.757 9.172L9.172 7.757L12 10.586Z"
            fill="#8E8E8E"
          />
        </g>
      </svg>
      CLOSED
    </button>
  );
}
//Page 2
export function RadioCandidate() {
  const { candidateFilterState, setCandidateFilterState } = useRecruiterContext();
  return (
    <div className="pt-[21.33px] text-[#616161] text-[15px] ">
      <p>FILTER YOUR CANDIDATES</p>
      <div className="flex flex-row mt-[5.33px]">
        <input
          type="radio"
          name="status"
          value="all"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setCandidateFilterState(e.target.value);
          }}
          checked={candidateFilterState === "all"}
        />
        <p className="pl-[5.33px] pr-[16px]">All</p>
        <input
          type="radio"
          name="status"
          value="waiting"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setCandidateFilterState(e.target.value);
          }}
          checked={candidateFilterState === "waiting"}
        />
        <p className="pl-[5.33px] pr-[16px]">Waiting</p>
        <input
          type="radio"
          name="status"
          value="in_progress"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setCandidateFilterState(e.target.value);
          }}
          checked={candidateFilterState === "in_progress"}
        />
        <p className="pl-[5.33px] pr-[16px]">In progress</p>
        <input
          type="radio"
          name="status"
          value="finished"
          className="accent-[#BF5F82]"
          onChange={(e) => {
            setCandidateFilterState(e.target.value);
          }}
          checked={candidateFilterState === "finished"}
        />
        <p className="pl-[5.33px]">Finished</p>
      </div>
    </div>
  );
}
export function WaitingReview() {
  return (
    <div className="flex flex-col items-center text-[#F48FB1] text-[13px] leading-[18px] text-center">
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M8.33334 13.75C4.88147 13.75 2.08334 10.9519 2.08334 7.5C2.08334 4.04813 4.88147 1.25 8.33334 1.25C11.7852 1.25 14.5833 4.04813 14.5833 7.5C14.5833 10.9519 11.7852 13.75 8.33334 13.75ZM8.33334 12.5C9.65943 12.5 10.9312 11.9732 11.8689 11.0355C12.8066 10.0979 13.3333 8.82608 13.3333 7.5C13.3333 6.17392 12.8066 4.90215 11.8689 3.96447C10.9312 3.02678 9.65943 2.5 8.33334 2.5C7.00726 2.5 5.73549 3.02678 4.79781 3.96447C3.86013 4.90215 3.33334 6.17392 3.33334 7.5C3.33334 8.82608 3.86013 10.0979 4.79781 11.0355C5.73549 11.9732 7.00726 12.5 8.33334 12.5ZM6.45834 5.625H7.70834V9.375H6.45834V5.625ZM8.95834 5.625H10.2083V9.375H8.95834V5.625Z"
            fill="#F48FB1"
          />
        </g>
      </svg>
      <p>
        Waiting for
        <br />
        review
      </p>
    </div>
  );
}
export function ReviewInProgress() {
  return (
    <div className="flex flex-col items-center text-[#F48FB1] text-[13px] leading-[18px]  text-center">
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M14.5833 8.75H13.3333V4.52375L8.37831 8.96125L3.33331 4.51V11.875H9.58331V13.125H2.70831C2.54255 13.125 2.38358 13.0592 2.26637 12.9419C2.14916 12.8247 2.08331 12.6658 2.08331 12.5V2.5C2.08331 2.33424 2.14916 2.17527 2.26637 2.05806C2.38358 1.94085 2.54255 1.875 2.70831 1.875H13.9583C14.1241 1.875 14.283 1.94085 14.4003 2.05806C14.5175 2.17527 14.5833 2.33424 14.5833 2.5V8.75ZM3.65269 3.125L8.37144 7.28875L13.0221 3.125H3.65269ZM12.7083 13.75L10.4983 11.54L11.3827 10.6562L12.7083 11.9825L14.9183 9.7725L15.8021 10.6562L12.7083 13.75Z"
            fill="#F48FB1"
          />
        </g>
      </svg>
      <p>
        Review in
        <br />
        Progress
      </p>
    </div>
  );
}
export function ReviewFinished() {
  return (
    <div className="flex flex-col items-center text-[#F48FB1] text-[13px] leading-[18px]  text-center">
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M4.53437 11.875L1.75 14.0625V2.5C1.75 2.33424 1.81585 2.17527 1.93306 2.05806C2.05027 1.94085 2.20924 1.875 2.375 1.875H13.625C13.7908 1.875 13.9497 1.94085 14.0669 2.05806C14.1842 2.17527 14.25 2.33424 14.25 2.5V11.25C14.25 11.4158 14.1842 11.5747 14.0669 11.6919C13.9497 11.8092 13.7908 11.875 13.625 11.875H4.53437ZM4.10188 10.625H13V3.125H3V11.4906L4.10188 10.625ZM7.55813 7.57563L10.21 4.92438L11.0938 5.80813L7.55813 9.34375L5.12687 6.9125L6.01125 6.02875L7.55813 7.57563Z"
            fill="#F48FB1"
          />
        </g>
      </svg>
      <p>
        Review
        <br />
        finished
      </p>
    </div>
  );
}
export function MarKAsStartedButton(props) {
  const updateClick = {
    job_user_mark: "in_progress",
    job_professional_id: props.mark,
  };
  const [isLoading, setIsLoading] = useState(false);
  async function handleClickMarkStatus(data) {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:4000/recruiter/candidate-status",
        data
      );
      await props.refreshData();
      await props.jobRefreshData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-[240px] h-[53.33px]">
          <Spinner color="pink.200" size="lg" />
        </div>
      ) : (
        <button
          className="text-[#616161] text-[15px] w-[240px] h-[53.33px] border-[1px] border-[#F48FB1] rounded-[21.33px] duration-200 hover:bg-rose-50"
          onClick={() => {
            handleClickMarkStatus(updateClick);
          }}
        >
          MARK AS STARTED
        </button>
      )}
    </>
  );
}
export function MarKAsFinishedButton(props) {
  const updateClick = {
    job_user_mark: "finished",
    job_professional_id: props.mark,
  };
  const [isLoading, setIsLoading] = useState(false);
  async function handleClickMarkStatus(data) {
    try {
      setIsLoading(true);
      const response = await axios.put(
        "http://localhost:4000/recruiter/candidate-status",
        data
      );
      await props.refreshData();
      await props.jobRefreshData();
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-[240px] h-[53.33px]">
          <Spinner color="pink.200" size="lg" />
        </div>
      ) : (
        <button
          className="text-[#616161] text-[15px] w-[240px] h-[53.33px] border-[1px] border-[#F48FB1] rounded-[21.33px] duration-500 hover:bg-rose-50"
          onClick={() => {
            handleClickMarkStatus(updateClick);
          }}
        >
          MARK AS FINISHED
        </button>
      )}
    </>
  );
}
export function FinishedButton() {
  return (
    <button className="text-[#8E8E8E] text-[15px] w-[140px] h-[53.33px] border-[1px] bg-[#E1E2E1] rounded-[21.33px] duration-300" disabled>
      FINISHED
    </button>
  );
}
export function formatNumber(num, precision = 2) {
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}
export function DownloadResumeButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDownloadClick(resumePath) {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.storage
        .from("files")
        .download(resumePath);
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
      if (data) {
        const blob = new Blob([data]);
        const url = window.URL.createObjectURL(blob); 
        const a = document.createElement("a");
        a.href = url;
        a.download = resumePath;
        a.click();
        window.URL.revokeObjectURL(url);
      }
      await props.refreshData();
      setIsLoading(false)
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return <>
  {isLoading ? (
        <div className="flex justify-center items-center mt-[21.33px] mb-[21.33px]">
          <Spinner color="pink.200" size="lg" />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-[21.33px] mb-[21.33px]">
          <button
            className="flex flex-row gap-2 w-[244px] h-[53.33px] items-center justify-center border-[1px] border-[#F48FB1] rounded-[21.33px] text-[#616161] hover:bg-rose-50"
            onClick={() => {
              handleDownloadClick(props.linkPdf);
            }}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Group">
                <path
                  id="Vector"
                  d="M3.5 19H21.5V21H3.5V19ZM13.5 13.172L19.571 7.1L20.985 8.514L12.5 17L4.015 8.515L5.429 7.1L11.5 13.17V2H13.5V13.172Z"
                  fill="#616161"
                />
              </g>
            </svg>
            DOWNLOAD CV
          </button>
        </div>
      )}
  </>
}
export function calculateDayAgo(data) {
  let dateString = data;
  let date = new Date(dateString);
  let currentDate = new Date();
  let timeDifference = currentDate - date;
  let daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let result = daysAgo === 1 ? "1" : daysAgo;
  return result;
}
export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}
