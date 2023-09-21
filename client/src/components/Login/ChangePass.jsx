import axios from "axios";
import { useState } from "react";
const ChangePass = ({ email, setPage }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const changePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await axios.put("http://localhost:4000/auth/password", {
          newPassword,
          email,
        });
        setPage("recovered");
      } catch (error) {
        console.log(error);
        setError("Error changing password");
      }
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <div className="flex mt-24 justify-center w-screen h-screen font-[Inter]">
      <section className="w-[35%] h-fit flex flex-col justify-center items-center pt-[20px] px-[20px] pb-[40px] bg-gray-100 border-[0.5px] border-gray-300 rounded-lg shadow-xl transition-all duration-500">
        <div className="w-[60%]">
          <form>
            <p className="text-[24px] pt-4">Change Password</p>
            <label>
              <p className="text-[18px] pt-2">New Password</p>
              <input
                type="password"
                placeholder="******"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[36px] flex flex-col justify-center text-[14px] p-[8px]"
              ></input>
              <p className="text-[18px] pt-2">Confrim Password</p>
              <input
                type="password"
                placeholder="******"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-[1px] border-[#F48FB1] rounded-[8px] w-full h-[36px] flex flex-col justify-center text-[14px] p-[8px]"
              ></input>
            </label>
          </form>
          <div className="flex flex-row justify-end pt-4">
            <button
              onClick={changePassword}
              className="rounded-[16px] bg-[#F48FB1] text-white text-[16px] w-[150px] h-[40px] hover:bg-[#d77696] "
            >
              Reset Password
            </button>
            {error && <p>{error}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ChangePass;
