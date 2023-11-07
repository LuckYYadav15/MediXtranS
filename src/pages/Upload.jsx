import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  vector_right,
  mediXtransFlow1,
  mediXtransUseCase1,
  Os_upgrade_2,
} from "../assets";
import { Footer, Navbar } from "../components";
import { server } from "../App";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null); 
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // useEffect to handle result changes and trigger handleSubmit
  //   if (result) {
  //     handleSubmit();
  //   }
  // }, [result]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const uploadEventHandler = async (event) => {
    event.preventDefault();
    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileData = event.target.result;
      const response = await fetch(
        "https://api-inference.huggingface.co/models/rakesh-ai/whisper-small-en",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: fileData,
        });
      
      const resultData = await response.json();
      // console.log("Result from Upload function: " + result.text);
      // console.log(result);
      setText(resultData.text);
      setResult(resultData.text);
      // console.log(result);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log(result);
    try {
      const data = await axios.post(
        `${server}/api/text/generate`,
        // `${server}/Text_API/post_api_generateText`,
        {
          patientid: 2,
          text_data: result,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          // withCredentials: true,
        }
      );
      console.log("data send successfully");
      // console.log(patientid + "  " + text);
      setSubmitted(true);
      navigate("../transcription");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleTranscription = () => {
  //   if(selectedFile===null){
  //     console.log("Please upload a file");
  //     alert("Please upload a file");
  //   }
  //   else{
  //     console.log(" upload a file");
  //     navigate("../transcription");
  //   }
  // };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="w-[100vw] md:mx-[30px] flex flex-col flex-wrap items-center justify-center lg:flex-row md:p-[5%]">
        <div className="flex-[6] md:w-[100%] h-[100%] flex flex-col flex-wrap justify-between">
          <div className="h-[60%] m-0 p-[10px] md:p-0 flex-1 flex flex-col">
            <h2 className="text-[#FFC727] text-[40px] md:text-[48px] lg:text-[60px] font-[700]">
              Get best speech to text results{" "}
            </h2>
            <p className="text-[20px] font-[300] mt-5">
              Upload any audio file format to convert it to text format
            </p>
          </div>
          <div className="flex flex-col ">
            <div className="flex-1 mt-12 justify-between items-around text-[22px] font-[Roboto] font-[700] flex flex-col sm:flex-row sm:justify-start">
              <button
                className="w-[150px] h-[44px] mr-[80px] shrink-0 justify-center rounded-[6px] text-white"
                type="submit"
              >
                <input
                  className="flex flex-col bg-[#6A6868] font-[Roboto] font-[300]"
                  type="file"
                  onChange={handleFileChange}
                />
              </button>
              <button
                className="w-[197px] h-[44px] shrink-0 justify-center mt-2 sm:mt-0 ml-10 rounded-[6px] bg-white text-[#6A6868] md:ml-[200px] border-2 border-[#6A6868]"
                type="submit"
                onClick={uploadEventHandler}
              >
                Generate Text
              </button>
            </div>

            <div className="flex-[5] hover:border-white border-2 w-auto h-auto flex justify-center lg: mt-[10px] w-[680px] lg:h-[651px] shrink-0 shadow-md p-3 md:mt-[10px] text-[19px] font-[Roboto] font-[300]">
              <textarea
                value={text}
                rows={10}
                cols={100}
                placeholder="audio file will be converted to text here"
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="flex-1 mt-5 justify-between items-around text-[22px] font-[Roboto] font-[700] flex flex-col sm:flex-row sm:justify-start">
              <button
                className="w-[197px] h-[44px] shrink-0 justify-center sm:mt-0 rounded-[6px] bg-white text-[#6A6868] border-2 border-[#6A6868]"
                type="submit"
                onClick={handleSubmit} 
              >
                <span className="font-[Roboto] font-[700] flex flex-row justify-evenly items-center">
                  <div>Transcribe</div>
                  <div>
                    <img src={vector_right} alt="" />
                  </div>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-[4] flex justify-center shrink-0">
          <div>
            <img width={"632px"} height={"632px"} src={Os_upgrade_2} alt="" />
          </div>
        </div>
      </div>
      <hr style={{ height: "3px", backgroundColor: "black" }} />
      <div className="flex items-center justify-center text-[40px] md:text-[56px] font-[700] font-[Roboto] mt-12 text-[#555555]">
        <h1>How it Works?</h1>
      </div>
      <div className="flex justify-center flex-col p-5 py-[80px] md:p-[60px] md:flex-row">
        <div className=" justify-center items-center">
          <img src={mediXtransFlow1} alt="" />
        </div>
        <div className="border-2 m-20 h-relative border-[#555555]"></div>
        <div className=" justify-center items-center">
          <img src={mediXtransUseCase1} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
