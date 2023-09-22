import { createContext, useState, useContext } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { cssVar } from "@chakra-ui/theme-tools";

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  // chakra style
  const navigate = useNavigate();
  const toast = useToast();
  const customTextStyle = {
    fontFamily: "Inter",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
  };
  const profFormStyle = {
    fontFamily: "Inter",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "#373737",
  };

  // register page context
  const [userType, setUserType] = useState("PROFESSIONAL");
  const [registerPage, setRegisterPage] = useState(1);
  const [recruiterRegisterPage, setRecruiterRegisterPage] = useState(1);

  // professional context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [title, setTitle] = useState("");
  const [professionalExperience, setProfessionalExperience] = useState("");
  const [educationalInfo, setEducationalInfo] = useState("");
  const [cv, setCv] = useState({});

  // recruiter context

  const [companyName, setCompanyName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [recruiterPassword, setRecruiterPassword] = useState("");
  const [recruiterpasswordConfirmation, setRecruiterPasswordConfirmation] =
    useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [logo, setLogo] = useState("");

  // handle submit

  const handleSubmit = async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    let error; // Declare error variable here

    try {
      if (userType === "PROFESSIONAL") {
        const { data, error: professionalError } = await supabase.storage
          .from("files")
          .upload(`professionalcv/${Date.now()}${cv.name}`, cv, {
            cacheControl: "3600",
            upsert: false,
          });

        if (professionalError) {
          error = professionalError; // Assign error if professionalError is defined
        }

        const professionalData = {
          email: email,
          password: password,
          user_type: userType,
          username: name,
          phone: phone,
          birthdate: birthDate,
          linkedin: linkedinUrl,
          title: title,
          experience: professionalExperience,
          education: educationalInfo,
          cv: data.path,
        };
        console.log(professionalData);

        const response = await axios.post(
          "http://localhost:4000/users/register-professional",
          professionalData
        );

        console.log(response.data);

        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Add a delay before navigating to the login page
        setTimeout(() => {
          navigate("/login");
        }, 3500); // 3500 milliseconds = 3.5 seconds
      }

      if (userType === "RECRUITER") {
        const { data, error: recruiterError } = await supabase.storage
          .from("files")
          .upload(`companyicon/${Date.now()}${logo.name}`, logo, {
            cacheControl: "3600",
            upsert: false,
          });
        if (recruiterError) {
          error = recruiterError; // Assign error if recruiterError is defined
        }
        console.log(error); // Log error here

        const urlPath = supabase.storage.from("files").getPublicUrl(data.path);

        const recruiterData = {
          email: recruiterEmail,
          password: recruiterPassword,
          user_type: userType,
          company_name: companyName,
          company_website: companyWebsite,
          company_description: aboutCompany,
          logo: urlPath.data.publicUrl,
        };

        console.log(recruiterData);

        const response = await axios.post(
          "http://localhost:4000/users/register-recruiter",
          recruiterData
        );

        console.log("Registration successful");

        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Add a delay before navigating to the login page
        setTimeout(() => {
          navigate("/login");
        }, 3500); // 3500 milliseconds = 3.5 seconds
      }
    } catch (error) {
      console.log("Registration error", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        // set page context
        registerPage,
        setRegisterPage,
        recruiterRegisterPage,
        setRecruiterRegisterPage,
        customTextStyle,
        profFormStyle,
        userType,
        setUserType,
        // professional contxt
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
        name,
        setName,
        phone,
        setPhone,
        birthDate,
        setBirthDate,
        linkedinUrl,
        setLinkedinUrl,
        title,
        setTitle,
        professionalExperience,
        setProfessionalExperience,
        educationalInfo,
        setEducationalInfo,
        setCv,
        // recruiter context
        companyName,
        setCompanyName,
        recruiterEmail,
        setRecruiterEmail,
        recruiterPassword,
        setRecruiterPassword,
        recruiterpasswordConfirmation,
        setRecruiterPasswordConfirmation,
        companyWebsite,
        setCompanyWebsite,
        aboutCompany,
        setAboutCompany,
        handleSubmit,
        setLogo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(UserContext);
};

export { ContextProvider, useGlobalContext };
