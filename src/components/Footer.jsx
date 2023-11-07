import React from "react";
import { mediXlogo_1, Group } from "../assets";

const Footer = () => {
  return (
    <footer className="w-full text-center bg-[#88D2DF] py-[25px] ">
      <div className="flex flex-col md:flex-row">
        <div className="flex-[2] flex justify-center">
          <img src={mediXlogo_1} alt="Logo" className="" />
        </div>
        <div className="flex-[4] flex flex-row justify-evenly ">
          <div className="">
            <ul className="flex flex-col justify-start gap-5 pt-8">
              <li className="">
                <p className="text-[35px] flex justify-start">Pricing</p>
              </li>
              <li>
                <a className="text-[24px] flex justify-start" href="">
                  About Product
                </a>
              </li>
              <li>
                <a className="text-[24px] flex justify-start" href="">
                  Get Customized
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <ul className="flex flex-col flex-wrap gap-5 pt-8">
              <li className="flex">
                <img className="py-2 pr-4"  src={Group} alt="Home" />
                <p className="p-0 text-[35px] flex justify-start">Contact</p>
              </li>
              <li className="flex flex-col justify-start">
                <p className="text-[20px] flex justify-start">Email : </p>
                <p className="text-[16px] flex justify-start">medixtrans@gmail.com</p>
              </li>
              <li>
                <div className="text-[20px] flex justify-start">Phone</div>
                <div className="text-[16px] flex justify-start">+91-7843247832</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p>&copy; 2023 Team MediXtranS, all rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
