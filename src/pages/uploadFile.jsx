import React, { useState, useEffect } from "react";
import ChooseFile from "../components/Choose file/ChooseFile";
import { Navigate } from "react-router-dom";

const UploadFile = () => {
  const [text, setText] = useState("");
  const [patientId, setPatientId] = useState("");
  const [resultData, setResultData] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const uploadEventHandler = async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();

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
    };

    reader.readAsArrayBuffer(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (submitted) {
    return <Navigate to="/trans" />;
  }
  return (
    <div style={{ gridRow: "auto" }}>
      <div
        style={{ marginBottom: "180px", marginRight: "550px" }}
        className="button_2"
      >
        <ChooseFile />
        <button
          style={{ width: "100px", height: "50px" }}
          onClick={uploadEventHandler}
          className="button"
          type="submit"
          name="dictateAudio"
        >
          Submit
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={resultData}
          rows={10}
          cols={100}
          onChange={(e) => setResultData(e.target.value)}
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

export default UploadFile;
