import React, { useState, useEffect } from "react";
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { TbTextCaption } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import { AiFillMessage, AiFillBell, AiFillFileText } from "react-icons/ai";
import Navbar from "../Navbar/Navbar";
// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      <Navbar />
      <div>
        <div className="landing-container">
          <div className="left-column">
            <p className="landing-text">
              Transcription that is accurate.
              <br /> Because we make <br /> it for you.
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "400",
                marginLeft: "70px",
              }}
            >
              Affordable and effective medical Transcription tool <br /> for
              doctors and nurses
            </p>
          </div>
          <div className="right-column">
            <img
              style={{ width: "100%", height: "70%" }}
              src={process.env.PUBLIC_URL + "/cylinder-animation.gif"}
              alt="My Image"
            />
          </div>
        </div>
      </div>
      <div className="landing-features">
        <div className="landing-features-left">
          <p style={{ fontSize: "4rem", fontWeight: "600" }}>Our features</p>
          <p style={{ fontSize: "2rem", fontWeight: "400" }}>
            Our software is designed to help medical professionals convert voice
            recordings of patient encounters into written documents, such as
            medical reports
          </p>
        </div>
        <div className="landing-features-right">
          <div className="lfr">
            <BsFillLightningChargeFill
              style={{ marginTop: "15px" }}
              size={25}
            />
            <p className="lfp">Voice recognition technology</p>
          </div>
          <p className="landing-features-left-right-p">
            uses advanced voice recognition technology to accurately transcribe
            spoken words into text.{" "}
          </p>
          <div className="lfr">
            <TbTextCaption style={{ marginTop: "15px" }} size={25} />
            <p className="lfp">Name Entity Generation</p>
          </div>
          <p className="landing-features-left-right-p">
            generate better reports with named entity to understand the
            patient's report better
          </p>
          <div className="lfr">
            <MdOutlineSecurity style={{ marginTop: "15px" }} size={25} />
            <p className="lfp">Secure and anonymous</p>
          </div>
          <p className="landing-features-left-right-p">
            We comply with all laws related to medical secrecy. Also, your
            information is transmitted using end-to-end encryption and is hidden
          </p>
        </div>
      </div>
      <div className="how-it-works">
        <div style={{ marginLeft: "60px" }}>
          <div
            style={{
              fontSize: "4rem",
              fontWeight: "600",
              alignItems: "center",
              marginBottom: "20px",
              marginLeft: "20px",
              marginTop: "50px",
            }}
          >
            How it works
          </div>
          <div className="landing-features-2">
            <div className="landing-features-right">
              <div className="lfr">
                <div
                  className="card"
                  style={{ width: "180%", height: "180px" }}
                >
                  <AiFillMessage size={30} />
                  <h2>Answer a few questions</h2>
                  <div>
                    <p>Tell us a little about what you're looking for</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-features-right">
              <div className="lfr">
                <div
                  className="card"
                  style={{ width: "180%", height: "180px" }}
                >
                  <AiFillBell size={30} />
                  <h2>Send the Reports</h2>
                  <p>
                    <p>Send your patient's report directly to his mail</p>
                  </p>
                </div>
              </div>
            </div>
            <div className="landing-features-right">
              <div className="lfr">
                <div
                  className="card"
                  style={{ width: "180%", height: "180px" }}
                >
                  <AiFillFileText size={30} />
                  <h2>Convert Speech to Text </h2>
                  <p>
                    <p>database of medical terms ensure accuracy</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="landing-container">
          <div className="left-column">
            <p className="landing-text">
              Get a free trial
              <br /> with a speicalized software now
            </p>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "400",
                marginLeft: "70px",
              }}
            >
              during the first Transcription, we will analyze the disease,
              patient name, duration and much more.
            </p>
          </div>
          <div className="right-column">
            <img
              style={{ width: "100%", height: "70%" }}
              src={process.env.PUBLIC_URL + "/last-animation.gif"}
              alt="My Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
