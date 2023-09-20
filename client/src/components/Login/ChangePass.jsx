import LoginPage from "../../pages/LoginPage";
const ChangePass = () => {
  const { setPage } = LoginPage;
   function changePassword() {
    setPage("recovered");
  }
  return (
    <div>
      <form>
        <p>Change Password</p>
        <label>
          <p>New Password</p>
          <input type="password" placeholder="********" className=""></input>
          <p>Confrim Password</p>
          <input type="password" placeholder="********" className=""></input>
        </label>
      </form>
      <button onClick={() => changePassword()}>Reset Password</button>
    </div>
  );
};
export default ChangePass;
