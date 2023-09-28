import { useAuth } from "../../../contexts/Authorization";
import { useState, useEffect } from "react";

function History() {
  const { state } = useAuth();
  const [history, setHistory] = useState("");

  const getHistory = async () => {
    setIsloading(true);
    try {
      const result = await axios.get(`http://localhost:4000/ads/history`, {
        params: { userID: state.userID },
      });
      setHistory(result.data.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="flex flex-col justify-start items-center w-full min-h-srceen pr-[100px] pl-[100px] pt-[50px] font-[Inter] bg-[#F5F5F6]">
      <div className="w-full">
        <p>Advertising History</p>
      </div>
      <div className="w-full h-fit">
        <div className="w-[90%] h-fit">
          <div className="w-full h-[30px] flex flex-row justify-start items-center">
            <p className="text-[14px] font-[400] font-[Inter]">Job</p>
            <p className="text-[14px] font-[400] font-[Inter]">Date</p>
            <p className="text-[14px] font-[400] font-[Inter]">Status</p>
          </div>
          <div className="w-full h-[30px] flex flex-row justify-start items-center">
          {/* {jobs.map((job) => {
            return
          })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default History;