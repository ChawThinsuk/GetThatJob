import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
<<<<<<< HEAD
import { useGlobalContext } from "../contexts/registerContext.jsx";
=======
>>>>>>> 07a5f4c (feat:validation)
import Navbar from "../components/navbar.jsx";
import SignupForm from "../components/register/signupform.jsx";
import axios from "axios";

function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    userRegister();
  };

<<<<<<< HEAD
=======
  const [user,setUserEmail] = useState("")
  const [userPassword,setUserPassword] = useState("")

  const userRegister = async () => {
    console.log(userEmail,userPassword);
  try {
    const userData = {
      user_email: user.username,
      user_password: user.Password, 
    }
    console.log(userData)
    const results = await axios.post("http://localhost:4000/register/users", userData);
    console.log(results)
  } catch (error) {
    console.log("request error");
  }
};
// const userProfileRegister = async () => {
//   try {
//     const userProfileData = {
//       username: username,
//       user_phone: phone,
//       user_birthdate: user_birthdate,
//       linkedin: linkedin,
//       experience: experience,
//       education: education,
//       cv: cv,
//       user_id: user_id
//     }
//     const results = await axios.post("http://localhost:4000/register/users-profile", userProfileData);
//     console.log(results)
//   } catch (error) {
//     console.log("request error");
//   }
// };


  const [userRegister1, setUserType] = useState();

>>>>>>> 07a5f4c (feat:validation)
  return (
    <ChakraProvider>
      <form onSubmit={handleSubmit}>
      <input
            id="user_email"
            name="email"
            type="text"
            placeholder="Enter email here"
            onChange={(event) => {
              setUserEmail(event.target.value)
            }}
          />
                <input
            id="user_password"
            name="password"
            type="text"
            placeholder="Enter password here"
            onChange={(event) => {
              setUserPassword(event.target.value)
            }}
          />
          <button type="submit" >Create</button>
      </form>
      {/* <Navbar />
      <SignupForm /> */}
    </ChakraProvider>
  );
}

export default RegisterPage;
