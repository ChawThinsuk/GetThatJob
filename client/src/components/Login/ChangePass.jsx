import axios from "axios";
import { useState } from "react";
const ChangePass = ({email, setPage}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const changePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await axios.put("http://localhost:4000/auth/password", {
          newPassword,email,
        });
        setPage('recovered');
      } catch (error) {
        console.log(error);
        setError("Error changing password");
      }
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <div>
      <form>
        <p>Change Password</p>
        <label>
          <p>New Password</p>
          <input
            type="password"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className=""
          ></input>
          <p>Confrim Password</p>
          <input
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className=""
          ></input>
        </label>
      </form>
      <button onClick={changePassword}>Reset Password</button>
      {error && <p>{error}</p>}
    </div>
  );
};
export default ChangePass;
