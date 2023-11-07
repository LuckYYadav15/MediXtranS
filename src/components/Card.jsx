import React from "react";
import { voice_control, Forms_cuate1, Safe_bro_1 } from "../assets";
import { useNavigate } from "react-router-dom";

export default function Card() {
  const navigate = useNavigate();
  const data = [
    {
      img: voice_control,
      name: "Voice recognition",
      text: "uses advanced voice recognition technology to accurately transcribe spoken words into text.",
    },
    {
      img: Forms_cuate1,
      name: "Name Entity Generation",
      text: "generate better reports with named entity to understand the patient's report and get better insights.",
    },
    {
      img: Safe_bro_1,
      name: "Secure and Easy",
      text: "We comply with all laws related to medical secrecy. Also, your information is transmitted using end-to-end encryption and is hidden.",
    },
  ];
  return (
    <>
      {data.map((item, index) => {
        return (
          <div className="flex flex-col flex-wrap w-[300px] p-4 m-4 gap-3 border-r-2 border-b-2 shadow-2xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-lg hover:scale-105">
            <div className="flex justify-center ">
              <img width="200px" src={item.img} alt="" />
            </div>
            <div className="flex justify-center text-[24px] font-[500] font-[Inter]">
              {item.name}
            </div>
            <div className="flex text-[16px] text-[#8B8B8B] font-[400] text-justify">
              {item.text}
            </div>
            <div className="flex justify-center">
              <button
                className="w-[197px] h-[44px] shrink-0 justify-center bg-[#FBD552] rounded-[6px] text-white"
                type="submit"
                onClick={()=>navigate("../home")}
              >
                <p className="font-[Roboto] font-[700]">Explore</p>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
