import { useState } from "react";
import man from "../../img/man.png"

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("PROFESSIONAL");

    const handleSubmit = (event) => {
        event.preventDefault()
        login({
            email,
            password,
            userType,
        });
    };
    return (
        <div className="flex flex-row justify-center items-start bg-[#F5F5F6] w-srceen h-[1000px] gap-[60px] pt-[200px]">
            <form className="ml-[150px] mr-[60px]" onSubmit={handleSubmit}>
                <h1 className="text-[48px] mb-2">Welcome back</h1>
                <h2 className="text-[20px] mt-2 mb-4">Login to you account as...</h2>
                <div>
                <button 
                className={`border-b-2 m-1 ${userType === "PROFESSIONAL" ? "border-[#F48FB1] text-[14px] text-black" : "border-[#BDBDBD] text-[14px] text-[#8E8E8E]"} `}
                        onClick={() => setUserType("PROFESSIONAL")}>
                            PROFESSIONAL
                    </button>
                    <button className={`border-b-2 m-1 ${userType === "RECRUITER" ? "border-[#F48FB1] text-[14px] text-black" : "border-[#BDBDBD] text-[14px] text-[#8E8E8E]"} `}
                        onClick={() => setUserType("RECRUITER")}> 
                            RECRUITER
                    </button>
                </div>
                <div className="mt-2">
                    <label>
                        <p className="text-[10px]">EMAIL</p>
                        <input
                         id="email"
                         name="email"
                         type="email"
                         placeholder="some.user@mail.com"
                         onChange={(event) => {
                            setEmail(event.target.value);
                         }}
                         value={email}
                         className="border-[1px] border-[#F48FB1] rounded-[8px] w-[356px] h-[36px] flex flex-col justify-center text-[14px] p-[8px]"
                        />
                    </label>
                </div>
                <div className="mt-2">
                    <label>
                        <p className="text-[10px]">PASSWORD</p>
                        <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="******"
                        onChange={(event) => {
                           setPassword(event.target.value);
                        }}
                        value={email}
                        className="border-[1px] border-[#F48FB1] rounded-[8px] w-[356px] h-[36px] flex flex-col justify-center text-[14px] p-[8px]"
                        />
                    </label>
                </div>
                <div className="mt-2 flex flex-row justify-end">
                    <button className="rounded-[16px] bg-[#F48FB1] text-white text-[16px] w-[80px] h-[40px]" type="submit">
                        LOGIN
                    </button>
                </div>
            </form>
            <img src={man} className="w-[560px] h-[567px]"/>
        </div>
    );
}

export default LoginPage;