import React, { useState, useEffect } from "react";
import ChooseFile from "../components/Choose file/ChooseFile";
import { Navigate } from "react-router-dom";
import LoadingPage from "../components/Loading/loading";
import NavBar from "../components/Navbar/Navbar";

const UploadFile = () => {
  const [text, setText] = useState("");
  const [patientId, setPatientId] = useState("");
  const [resultData, setResultData] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // added state for loading animation

  const uploadEventHandler = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();

    setLoading(true); // show loading animation before fetch request

    reader.onload = async (event) => {
      const fileData = event.target.result;
      const response = await fetch(
        "https://api-inference.huggingface.co/models/openai/whisper-medium",
        {
          headers: {
            Authorization: "Bearer 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",
          },
          method: "POST",
          body: fileData,
        }
      );
      const result = await response.json();
      console.log(result);
      setResultData(result.text);
      setLoading(false); // hide loading animation after fetch request
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // show loading animation before fetch request

    fetch("/text/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text_data: resultData, patientid: patientId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitted(true);
        setLoading(false); // hide loading animation after fetch request
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); // hide loading animation after fetch request
      });
  };

  if (loading) {
    // show loading animation if loading state is true
    return <LoadingPage />;
  }

  if (submitted) {
    return <Navigate to="/trans" />;
  }

  return (
    <div style={{ gridRow: "auto" }}>
      <NavBar />
      <div
        style={{ marginBottom: "0px", marginLeft: "0px" }}
        className="button_2"
      >
        <div style={{ padding: "20px", marginTop: "30px" }}>
          <ChooseFile />
        </div>
        <div style={{ padding: "20px" }}>
          <button
            style={{ width: "150px", height: "50px" }}
            onClick={uploadEventHandler}
            className="button"
            type="submit"
            name="dictateAudio"
          >
            Generate Text
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={resultData}
          rows={10}
          cols={100}
          placeholder="audio file will be converted to text here"
          onChange={(e) => setResultData(e.target.value)}
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
          style={{ padding: "10px 10px", width: "100px", marginLeft: "40%" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
