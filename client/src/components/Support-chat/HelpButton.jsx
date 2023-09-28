import UserChat from "./UserChat";
import { useState } from "react";
import supportIcon from "../../assets/support-chat/support-icon.svg"

function Help ({email}) {
    const [visible, setVisible] = useState(false);
    const handleToggle = () => {
      setVisible((current) => !current);
    };
    return (
      <div className=" w-[450px] flex flex-col justify-end  items-end">
       
          <button
                className="w-[75px] h-[75px] bg-[#F48FB1] rounded-full mt-[50px] fixed bottom-[35px] right-[35px] flex justify-center items-center hover:bg-rose-200 active:outline outline-offset-4 outline-[#F48FB1] duration-100"
                onClick={handleToggle}
              >
                <img src={supportIcon} />
              </button>
              
            {visible && <UserChat email={email}/>}
          </div>
    )
  }
export default Help