import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/Loading/loading";
import NavBar from "../components/Navbar/Navbar";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [patientId, setPatientId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const recognition = new window.webkitSpeechRecognition();
  const [loading, setLoading] = useState(false); // added state for loading animation

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  const handleStart = () => {
    setIsRecording(true);
    recognition.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognition.stop();
  };

  const handleSubmit = (e) => {
    setLoading(true); // show loading animation before fetch request
    e.preventDefault();
    fetch("/text/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text_data: text, patientid: patientId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitted(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setText(transcript);
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

  if (submitted) {
    return <Navigate to="/trans" />;
  }
  if (loading) {
    // show loading animation if loading state is true
    return <LoadingPage />;
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          padding: "10px 10px",
          marginLeft: "40%",
          width: "60px",
          color: "white",
        }}
      >
        <button onClick={isRecording ? handleStop : handleStart}>
          {isRecording ? "Stop" : "Start"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          rows={10}
          cols={100}
          onChange={(e) => setText(e.target.value)}
        />
        <div>
          <label htmlFor="patientId">Patient Id</label>
          <input
            type="text"
            placeholder="enter patient id"
            name="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <button
          style={{
            padding: "10px 10px",
            width: "100px",
            marginLeft: "40%",
            color: "white",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SpeechToText;
