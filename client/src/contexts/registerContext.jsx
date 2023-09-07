import { createContext, useState, useContext } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// dotenv.config();

const UserContext = createContext();

const ContextProvider = ({ children }) => {
  // chakra style
  const customTextStyle = {
    fontFamily: "Inter",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
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
  const [cv, setCv] = useState(null);

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

    try {
      if (userType === "PROFESSIONAL") {
        const { data, error } = await supabase.storage
          .from("files")
          .upload(`professionalcv/${cv.name}`, cv, {
            cacheControl: "3600",
            upsert: false,
          });
        const professionalData = {
          professional_email: email,
          professional_password: password,
          username: name,
          phone: phone,
          birthdate: birthDate,
          linkedin: linkedinUrl,
          title: title,
          experience: professionalExperience,
          education: educationalInfo,
          cv: data.path,
        };
        const response = await axios.post(
          "http://localhost:4000/users/register-professional",
          professionalData
        );
        console.log(response.data)
      }
      if (userType === "RECRUITER") {
        const { data, error } = await supabase.storage
          .from("files")
          .upload(`companyicon/${logo.name}`, logo, {
            cacheControl: "3600",
            upsert: false,
          });

        const urlPath = supabase.storage.from("files").getPublicUrl(data.path);

        const recruiterData = {
          recruiter_email: recruiterEmail,
          recruiter_password: recruiterPassword,
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
      }
      console.log(response.data);
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
