import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [patientId, setPatientId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const recognition = new window.webkitSpeechRecognition();

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

  return (
    <div>
      <div style={{ padding: "10px 10px", marginLeft: "40%", width: "60px" }}>
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
            placeholder="patient id"
            name="patientId"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <button
          style={{ padding: "10px 10px", width: "100px", marginLeft: "40%" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SpeechToText;
