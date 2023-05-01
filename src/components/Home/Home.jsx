import React from "react";
import "./Home.css";
import { Mic } from "react-bootstrap-icons";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const navigate = useNavigate();
  const someEventHandler = () => {
    navigate("/speech");
  };
  const uploadEventHandler = () =>{
    navigate("/uploadFile")
  }
  return (
    <div className="Home">
      <Navbar />
      <div className="homeWrapper">
        <div className="homeElements">
          <Mic size={96} />
        </div>
        <div className="buttons">
          <div className="button_1">
            <button
              onClick={someEventHandler}
              className="button"
              type="submit"
              name="dictateAudio"
            >
              <h5>DICTATE AUDIO</h5>
            </button>
          </div>
          <div className="button_1">
            <button
              onClick={uploadEventHandler}
              className="button"
              type="submit"
              name="dictateAudio"
            >
              <p>upload File</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
