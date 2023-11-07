import React, { useEffect, useState, useRef } from "react";
import { Footer } from "../components";
import {
  vector_right,
  landingPage_main_image,
  mediXlogo_4,
  Mask_group,
} from "../assets";
import { Card } from "../components";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const targetRef = useRef(null);
  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const data = [
    "We have integrated the software with Indian Health Agencies EHR/EMR system",
    "Our service works in real-time so reports can be generated seamlessly",
    "We ensure high accuracy in transcription and highlight all insight information",
    "We customize the software according to customers / organizations",
    "Organizations themselves manage and own their patients data",
    "Our software is easy to use and no extra efforts are required",
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to update the window width on resize
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Add event listener to track window resize
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    console.log(windowWidth);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const firstDivStyle = {
    backgroundImage: `url(${landingPage_main_image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100vw",
    /* Add other styles here as needed */
  };
  const SecondDivStyle = {
    backgroundImage: `url(${mediXlogo_4})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100vw",
    /* Add other styles here as needed */
  };

  return (
    <div className=" w-[100%]  overflow-x-hidden font-[Roboto] ">
      <div
        className="w-[100vw] overflow-x-hidden h-[98vh] flex flex-col items-center"
        style={firstDivStyle}
      >
        <div className="w-4/5 md:w-3/4 xl:w-1/2 h-3/4 md:h-3/4 flex flex-col items-center justify-evenly">
          <div>
            <p className="text-[24px] md:text-[27px] text-[#453c1b] font-[900]">
              MediXtranS
            </p>
          </div>
          <div>
            <p className="text-[34px] font-Roboto md:text-[40px] font-[900] tracking-[6%]">
              Transcription that is Accurate
            </p>
          </div>
          <div>
            <p className="text-[20px] md:text-[24px] text-justify text-[#6A6868] font-[500] font-Poppins flex ">
              Affordable and effective medical Transcription tool for doctors
              and nurses supporting multiple languages
            </p>
          </div>
          <div className="justify-center items-center text-[22px] font-[700] flex flex-col sm:flex-row sm:justify-start">
            <button
              className="w-[197px] h-[44px] shrink-0 justify-center bg-[#6A6868] rounded-[6px] text-white"
              type="submit"
            >
              <p onClick={scrollToTarget} className="font-[Roboto] font-[700]">
                Getting Started
              </p>
            </button>
            <button
              className="w-[197px] h-[44px] shrink-0 justify-center mt-2 sm:mt-0 rounded-[6px] bg-white text-[#6A6868] md:ml-[45px] border-2 border-[#6A6868]"
              type="submit"
              onClick={() => navigate("../login")}
            >
              <p className="font-[Roboto] font-[700] flex flex-row justify-evenly items-center">
                <div>Login</div>
                <div>
                  <img src={vector_right} alt="" />
                </div>
              </p>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={targetRef}
        className="w-[100vw] lg:w[98vw] flex my-10 justify-center lg:justify-evenly"
        id="started"
      >
        <div className="w-[60vw] sm:h-[60vh] flex flex-col justify-left lg:ml-[60px] gap-8">
          <p className="text-[27px] text-[#6A6868] font-[900]">
            What is MediXtranS?
          </p>
          <p className="text-[16px] md:text-[27px] text-[#1E1E1E] font-[300] text-justify">
            Medical transcription is the process of converting spoken medical
            dictations into written format, ensuring accurate and detailed
            documentation of patient encounters. We provide medical reports,
            including patient histories, diagnoses, treatment plans, and other
            relevant information. These reports serve as crucial records for
            healthcare providers, facilitating communication, continuity of
            care, and billing processes.
          </p>
        </div>
        <div className="absolute flex md:block  right-[10vw]">
          <img src={mediXlogo_4} alt="" className="r-0" />
        </div>
      </div>
      <div className="border-[1px] border-black"></div>
      <div className="w-full my-10">
        <p className="left-[30%] p-10 text-[27px] text-[#6A6868] font-[900]">
          Explore Our Features
        </p>
        <div className="flex flex-wrap justify-evenly">
          <Card />
        </div>
      </div>
      <div className="border-[1px] border-black"></div>
      <div className="w-full p-[40px] mb-10">
        <span>
          <p className="text-[#6A6868] my-[20px] text-[20px] md:text-[27px] font-[900]">
            What makes us different
          </p>
        </span>
        {data.map((item, index) => {
          return (
            <span className="flex gap-5 mt-2">
              <img src={Mask_group} alt="" />
              <p className="text-[#1E1E1E] text-[12px] md:text-[20px] font-[300]">
                {item}
              </p>
            </span>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
