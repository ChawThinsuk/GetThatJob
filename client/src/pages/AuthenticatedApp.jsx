import { Routes, Route } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function AuthenticatedApp() {
  const {state} = useAuth()
  console.log(state)
  return (
    <div className="App">
      <p>Hello</p>
    </div>
  );
}

export default AuthenticatedApp;
