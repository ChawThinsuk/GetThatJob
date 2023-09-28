import React, { useState } from "react";
import {
  ReviewFinished,
  ReviewInProgress,
  WaitingReview,
  MarKAsStartedButton,
  MarKAsFinishedButton,
  FinishedButton,
  calculateDayAgo,
  formatDate,
  DownloadResumeButton,
} from "./Recruiter-1-2-Component";

function Candidate(props) {
  const data = props.datas;
  const [item, setItemm] = useState(props.datas);
  const date = calculateDayAgo(data.application_created_at);

  const handleToggleActive = () => {
    let newActive = item.active === 1 ? 0 : 1;
    setItemm({ ...item, active: newActive });
  };
  console.log(data.application_created_at);

  return (
    <>
      {/* {data.job_user_mark !== "declined" && ( */}
        <div
          className={`flex flex-col justify-between  w-[1258.72px] rounded-[8px] mt-[21.33px] shadow-md group ${
            item.active === 1 ? `is-active bg-white` : ` duration-1000`
          }`}
        >
          <div className="flex flex-row w-full h-[100px] justify-between items-center duration-1000 rounded-lg">
            <div className="ml-[24.33px]">
              <p className="text-[21px] font-[Montserrat] font-medium">
                {data.username}
              </p>
              <div className="flex flex-row text-[15px] text-[#616161] gap-2 ">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M3 2.75H15C15.1989 2.75 15.3897 2.82902 15.5303 2.96967C15.671 3.11032 15.75 3.30109 15.75 3.5V15.5C15.75 15.6989 15.671 15.8897 15.5303 16.0303C15.3897 16.171 15.1989 16.25 15 16.25H3C2.80109 16.25 2.61032 16.171 2.46967 16.0303C2.32902 15.8897 2.25 15.6989 2.25 15.5V3.5C2.25 3.30109 2.32902 3.11032 2.46967 2.96967C2.61032 2.82902 2.80109 2.75 3 2.75ZM3.75 4.25V14.75H14.25V4.25H3.75ZM5.625 7.25C5.32663 7.25 5.04048 7.13147 4.8295 6.9205C4.61853 6.70952 4.5 6.42337 4.5 6.125C4.5 5.82663 4.61853 5.54048 4.8295 5.3295C5.04048 5.11853 5.32663 5 5.625 5C5.92337 5 6.20952 5.11853 6.4205 5.3295C6.63147 5.54048 6.75 5.82663 6.75 6.125C6.75 6.42337 6.63147 6.70952 6.4205 6.9205C6.20952 7.13147 5.92337 7.25 5.625 7.25ZM4.875 8H6.375V13.625H4.875V8ZM9 8.3225C9.438 7.89875 9.9495 7.625 10.5 7.625C12.0533 7.625 13.125 8.88425 13.125 10.4375V13.625H11.625V10.4375C11.625 10.0894 11.4867 9.75556 11.2406 9.50942C10.9944 9.26328 10.6606 9.125 10.3125 9.125C9.9644 9.125 9.63056 9.26328 9.38442 9.50942C9.13828 9.75556 9 10.0894 9 10.4375V13.625H7.5V8H9V8.3225Z"
                      fill="#616161"
                    />
                  </g>
                </svg>
                <p>{data.linkedin}</p>
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center text-center gap-2 text-[#8E8E8E] text-[13px]">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M2.54169 1.875H13.7917C13.9574 1.875 14.1164 1.94085 14.2336 2.05806C14.3508 2.17527 14.4167 2.33424 14.4167 2.5V12.5C14.4167 12.6658 14.3508 12.8247 14.2336 12.9419C14.1164 13.0592 13.9574 13.125 13.7917 13.125H2.54169C2.37593 13.125 2.21696 13.0592 2.09975 12.9419C1.98254 12.8247 1.91669 12.6658 1.91669 12.5V2.5C1.91669 2.33424 1.98254 2.17527 2.09975 2.05806C2.21696 1.94085 2.37593 1.875 2.54169 1.875ZM13.1667 4.52375L8.21169 8.96125L3.16669 4.51V11.875H13.1667V4.52375ZM3.48606 3.125L8.20481 7.28875L12.8554 3.125H3.48606Z"
                      fill="#8E8E8E"
                    />
                  </g>
                </svg>
                <p>{data.email}</p>
              </div>
              <div className="flex flex-row items-center text-center gap-2 text-[#8E8E8E] text-[13px]">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M6.52044 6.67625C7.1069 7.70655 7.96014 8.55979 8.99044 9.14625L9.54294 8.3725C9.63179 8.24808 9.76316 8.16055 9.91219 8.12646C10.0612 8.09237 10.2176 8.11408 10.3517 8.1875C11.2356 8.67058 12.2118 8.96111 13.2161 9.04C13.3728 9.05242 13.5191 9.12346 13.6258 9.23895C13.7325 9.35444 13.7917 9.5059 13.7917 9.66313V12.4519C13.7917 12.6066 13.7343 12.7559 13.6307 12.8708C13.527 12.9856 13.3844 13.058 13.2304 13.0737C12.8992 13.1081 12.5654 13.125 12.2292 13.125C6.87919 13.125 2.54169 8.7875 2.54169 3.4375C2.54169 3.10125 2.55856 2.7675 2.59294 2.43625C2.60872 2.28231 2.68105 2.1397 2.79593 2.03602C2.91081 1.93234 3.06007 1.87497 3.21481 1.875H6.00356C6.16079 1.87498 6.31225 1.93422 6.42774 2.04091C6.54323 2.14759 6.61427 2.29389 6.62669 2.45063C6.70558 3.45487 6.99611 4.43105 7.47919 5.315C7.5526 5.4491 7.57432 5.60546 7.54023 5.7545C7.50614 5.90353 7.4186 6.0349 7.29419 6.12375L6.52044 6.67625ZM4.94419 6.26562L6.13169 5.4175C5.79468 4.69006 5.56378 3.91803 5.44606 3.125H3.79794C3.79419 3.22875 3.79231 3.33312 3.79231 3.4375C3.79169 8.0975 7.56919 11.875 12.2292 11.875C12.3336 11.875 12.4379 11.8731 12.5417 11.8687V10.2206C11.7487 10.1029 10.9766 9.87201 10.2492 9.535L9.40106 10.7225C9.0596 10.5898 8.72794 10.4332 8.40856 10.2537L8.37231 10.2331C7.14642 9.53545 6.13124 8.52026 5.43356 7.29437L5.41294 7.25812C5.2335 6.93875 5.07686 6.60709 4.94419 6.26562Z"
                      fill="#8E8E8E"
                    />
                  </g>
                </svg>
                <p>{data.phone}</p>
              </div>
            </div>
            <div className="flex flex-row gap-14">
              <div className="flex flex-col items-center text-[#8E8E8E] text-[13px]  text-center">
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
                      d="M2.70831 1.875H13.9583C14.1241 1.875 14.283 1.94085 14.4003 2.05806C14.5175 2.17527 14.5833 2.33424 14.5833 2.5V12.5C14.5833 12.6658 14.5175 12.8247 14.4003 12.9419C14.283 13.0592 14.1241 13.125 13.9583 13.125H2.70831C2.54255 13.125 2.38358 13.0592 2.26637 12.9419C2.14916 12.8247 2.08331 12.6658 2.08331 12.5V2.5C2.08331 2.33424 2.14916 2.17527 2.26637 2.05806C2.38358 1.94085 2.54255 1.875 2.70831 1.875ZM13.3333 4.52375L8.37831 8.96125L3.33331 4.51V11.875H13.3333V4.52375ZM3.65269 3.125L8.37144 7.28875L13.0221 3.125H3.65269Z"
                      fill="#616161"
                    />
                  </g>
                </svg>
                {date < 7 ? (
                  <p>
                    {date} day
                    <br />
                    ago
                  </p>
                ) : (
                  <p>
                    sent on
                    <br /> {formatDate(data.application_created_at)}
                  </p>
                )}
              </div>
              {data.job_user_mark === "waiting" && <WaitingReview />}
              {data.job_user_mark === "in_progress" && <ReviewInProgress />}
              {data.job_user_mark === "finished" && <ReviewFinished />}
            </div>
            {/* button */}
            <div className="flex flex-row items-center gap-2 mr-[74.67px]">
              {data.job_user_mark === "waiting" && (
                <MarKAsStartedButton
                  mark={data.job_professional_id}
                  refreshData={props.refreshData}
                  jobRefreshData={props.jobRefreshData}
                />
              )}
              {data.job_user_mark === "in_progress" && (
                <MarKAsFinishedButton
                  mark={data.job_professional_id}
                  refreshData={props.refreshData}
                  jobRefreshData={props.jobRefreshData}
                />
              )}
              {data.job_user_mark === "finished" && (
                <FinishedButton mark={data.job_professional_id} />
              )}
            </div>
          </div>
          {/* text */}
          <div className="flex flex-row items-between w-full">
            <div className="overflow-hidden max-h-0 w-full group-[.is-active]:max-h-[600px] duration-1000 ml-[21.33px]">
              <div className="text-[14px]">
                <p className="text-[#BF5F82] text-[17px] font-[Montserrat] mt-[21.33px]">
                  Professional experience
                </p>
                <p className="mt-[10.66px]">{item.experience}</p>
              </div>
              <div className="text-[14px]">
                <p className="text-[#BF5F82] text-[17px] font-[Montserrat] mt-[21.33px]">
                  Why are you interested in working at The company name SA
                </p>
                <p className="mt-[10.66px]">{item.interested}</p>
              </div>
              <DownloadResumeButton
                linkPdf={data.job_user_cv}
                refreshData={props.refreshData}
              />
            </div>
            <div className="flex items-end h-full relative">
              <div
                className="flex flex-col justify-end items-end cursor-pointer group-[.is-active]:rotate-[180deg] duration-500 mr-[21.33px] absolute bottom-6 right-1"
                onClick={handleToggleActive}
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
                      d="M12 13.172L16.95 8.22205L18.364 9.63605L12 16L5.636 9.63605L7.05 8.22205L12 13.172Z"
                      fill="#616161"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
}

export default Candidate;
