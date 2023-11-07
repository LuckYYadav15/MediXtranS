import {React, useState, useEffect }from "react";
import {mediXlogo_2,tabler_home,ic_twotone_mic,basil_upload_outline,User_logo} from "../assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScroll,setIsScroll] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = event => {
      setIsScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    return (
      <> 
      {isScroll ? (
        <nav className="fixed w-[100vw] bg-white flex flex-row items-center p-0 m-0 justify-between">
          <div className="flex flex-row items-center ml-0 md:ml-10 ">
            <div className="">
              <img className=" w-[100px] mx-0 sm:mx-[20px] hover:cursor-pointer " onClick={() => navigate("/home")} src={mediXlogo_2} alt="logo" />
            </div>
          </div>
          <div className=" items-center justify-center mr-4 sm:mr-10 md:mr-20">
            <ul className="flex flex-row font-[700] font-[Roboto] text-[18px] gap-[20px] md:gap-[50px] lg:gap-[100px]">
              <li className=" hover:cursor-pointer hover:text-blue-500 ">
                <img onClick={() => navigate("/home")}  src={tabler_home} alt="" />
              </li>
              <li className=" hover:cursor-pointer hover:text-blue-500">
              <img onClick={() => navigate("/record")}  src={ic_twotone_mic} alt="" />
              </li>
              <li className=" hover:cursor-pointer hover:text-blue-500">
              <img onClick={() => navigate("/upload")}  src={basil_upload_outline} alt="" />
              </li>
              <div className="">
                <img src={User_logo} className="w-[27px] hover:cursor-pointer" alt="User" />
              </div>
            </ul>
          </div>
        </nav>
      ):(
        <nav className="fixed w-[100vw] bg-white flex flex-row items-center justify-between">
          <div className="flex flex-row items-center ml-0 sm:ml-[20px] ">
            <div className="">
              <img className=" w-[100px] mx-0 sm:mx-[20px] hover:cursor-pointer " onClick={() => navigate("/home")} src={mediXlogo_2} alt="logo" />
            </div>
            <div className="hidden md:block text-[24px] font-[500] hover:cursor-pointer" onClick={() => navigate("/home")}>
              MediXtrans
            </div>
          </div>
          <div className="hidden md:block items-center justify-center mr-20">
            <ul className="flex flex-row font-[700] font-[Roboto] text-[18px] gap-[50px] lg:gap-[100px]">
              <li className=" hover:cursor-pointer hover:text-blue-500 ">
                <p onClick={() => navigate("/home")}>Home</p>
              </li>
              <li className=" hover:cursor-pointer hover:text-blue-500">
                <p onClick={() => navigate("/record")}>Record</p>
              </li>
              <li className=" hover:cursor-pointer hover:text-blue-500">
                <p onClick={() => navigate("/upload")}>Upload</p>
              </li>
              <div className="">
                <img src={User_logo} className="w-[27px] hover:cursor-pointer" alt="User" />
              </div>
            </ul>
          </div>
          <div className="md:hidden items-center justify-center mr-4 sm:mr-10 md:mr-20">
            <ul className="flex flex-row font-[700] font-[Roboto] text-[18px] gap-[20px] md:gap-[50px] lg:gap-[100px]">
              <li className=" hover:cursor-pointer hover:text-blue-500 ">
                <img onClick={() => navigate("/")}  src={tabler_home} alt="" />
              </li>
              <li className=" hover:cursor-pointer hover:text-blue-500">
              <img onClick={() => navigate("/record")}  src={ic_twotone_mic} alt="" />
              </li>
              <li className=" hover:cursor-pointer hover:text-blue-500">
              <img onClick={() => navigate("/upload")}  src={basil_upload_outline} alt="" />
              </li>
              <div className="">
                <img src={User_logo} className="w-[27px] hover:cursor-pointer" alt="User" />
              </div>
            </ul>
          </div>
        </nav>
      )}
      </>
  )
  
};

export default Navbar;
