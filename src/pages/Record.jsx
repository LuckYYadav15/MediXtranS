import React, { useState, useEffect, useRef } from "react";
import { vector_right, microphone, voice_assignment_1 } from "../assets";
import { Footer } from "../components";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";

export default function Record() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  // useEffect(() =>{
  //   if(!isLoggedIn){
  //     return navigate("./login");
  //   }
  // },[isLoggedIn])

  const targetRef = useRef(null);
  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const [isRecording, setIsRecording] = useState(false);
  const [patientid, setPatientid] = useState(12345);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setText(text + " " + transcript);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    return () => {
      recognition.stop();
    };
  }, [isRecording]);

  // const btn = document.getElementById("elem");

  // btn.addEventListener("click", () =>
  //   window.scrollTo({
  //     top: 1000,
  //     behavior: "smooth",
  //   })
  // );

  const handleStart = () => {
    setIsRecording(true);
    recognition.abort(); // Abort any ongoing recognition (if any)
    recognition.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognition.stop();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        `${server}/api/text/generate`,
        // `${server}/Text_API/post_api_generateText`,
        {
          patientid: patientid,
          text_data: text,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          // withCredentials: true,
        }
      );
      console.log("data send successfully");
      console.log(patientid + "  " + text);
      setSubmitted(true);
      navigate("../transcription");
    } catch (error) {
      console.log(error);
    }
  };
  if (submitted) {
    return navigate("./transcription");
  }
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="w-[100vw] md:mx-[30px] flex flex-col flex-wrap items-center justify-center lg:flex-row md:p-[5%]">
        <div className="flex-[6] md:w-[100%] h-[100%] flex flex-col flex-wrap justify-between">
          <div className="h-[60%] m-0 p-[10px] md:p-0 flex-1 flex flex-col">
            <h2 className="text-[#FFC727] text-[40px] md:text-[48px] lg:text-[60px] font-[700]">
              Interact with the application in real-time
            </h2>
            <p className="text-[20px] font-[300] mt-5">
              Start now button helps to start the voice recording and generate
              text for it and you can also edit it
            </p>
          </div>
          <div className="flex-1 mt-12 justify-center items-center text-[22px] font-[Roboto] font-[700] flex flex-col sm:flex-row sm:justify-start">
            <button
              className="w-[197px] h-[44px] shrink-0 justify-center bg-[#6A6868] rounded-[6px] text-white"
              type="submit"
              onClick={scrollToTarget}
            >
              <p className="font-[Roboto] font-[700]">Start Recording</p>
            </button>
            <button
              className="w-[197px] h-[44px] shrink-0 justify-center mt-2 sm:mt-0 rounded-[6px] bg-white text-[#6A6868] md:ml-[45px] border-2 border-[#6A6868]"
              type="submit"
              onClick={() => navigate("../upload")}
            >
              <p className="font-[Roboto] font-[700] flex flex-row justify-evenly items-center">
                <div>Upload file</div>
                <div>
                  <img src={vector_right} alt="" />
                </div>
              </p>
            </button>
          </div>
        </div>
        <div className="flex-[4] flex justify-center shrink-0">
          <div>
            <img
              width={"632px"}
              height={"632px"}
              src={voice_assignment_1}
              alt=""
            />
          </div>
        </div>
      </div>
      <hr ref={targetRef} style={{ height: "3px", backgroundColor: "black" }} />
      <div className="flex justify-center flex-col py-[80px] md:p-[60px] lg:flex-row">
        <div className="flex-[4] flex-col justify-center items-center">
          <div className="flex justify-center">
            <img width={"220px"} height={"209px"} src={microphone} alt="" />
          </div>
          <div className="my-3 flex justify-evenly">
            <button
              onClick={!isRecording ? handleStart : undefined}
              className="w-[160px] h-[44px] shrink-0 bg-[#6A6868] rounded-[6px] text-white"
              type="submit"
              disabled={isRecording}
            >
              <p className="text-[19px] font-[Roboto] font-[700]">Start</p>
            </button>
            <button
              onClick={isRecording ? handleStop : undefined}
              className="w-[160px] h-[44px] shrink-0 bg-[#6A6868] rounded-[6px] text-white"
              type="submit"
              disabled={!isRecording}
            >
              <p className="text-[19px] font-[Roboto] font-[700]">Stop</p>
            </button>
          </div>
          <div className="my-10 flex justify-center">
            <button
              className="w-[197px] h-[44px] shrink-0 bg-[#FFC727] rounded-[6px] text-white"
              type="submit"
              onClick={handleSubmit}
            >
              <p className="text-[19px] font-[Roboto] font-[700]">
                Save & Transcribe
              </p>
            </button>
          </div>
        </div>
        <div className="flex-[5] hover:border-white border-2 w-auto h-auto flex justify-center lg:w-[680px] lg:h-[651px] shrink-0 shadow-md p-3 md:text-[19px] font-[Roboto] font-[300]">
          {/* <p className="text-justify" value={text} onChange={(e)=> setText(e.target.value)}>
            {text}
          </p>  */}
          <textarea
            value={text}
            rows={10}
            cols={100}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
