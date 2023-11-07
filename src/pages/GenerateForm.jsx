import {Reac,useEffect, useState} from "react";
import "./generateForm.css"
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./generateForm.css";
export default function GenerateForm  ({ resultData }) {
  
  const formRef = useRef(null);
  const handleDownload = () => {
    const input = formRef.current;

    const pdfWidth = input.offsetWidth * 1.5; // Increase the width by a factor, adjust as needed
    const pdfHeight = input.offsetHeight; // Get the height of the content

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", [pdfWidth, pdfHeight]); // Set orientation to landscape ("l") and specify width and height
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("form.pdf");
    });
  };

  var [Age, setAge] = useState(null);
  var [Sex, setSex] = useState(null);
  var [CE, setCE] = useState(null);
  var [BS, setBS] = useState(null);
  var [SS, setSS] = useState(null);
  Age = localStorage.getItem("medixTransGenerateFormAge");
    Sex = localStorage.getItem("medixTransGenerateFormSex");
    BS = localStorage.getItem("medixTransGenerateFormBS");
    CE = localStorage.getItem("medixTransGenerateFormCE");
    SS = localStorage.getItem("medixTransGenerateFormSS");

  return (
    <>
    <div className="notes-form-section" ref={formRef}>
    <div className="container">
        <div className="notes-form-main-navbar">
          <div className="notes-form-heading">Create/Edit Patient Details</div>
          <div className="notes-form-cross-sign">
          </div>
        </div>
        <div>
          <div>
            <div className="notes-form-allInput">
              <div className="notes-form-classInput">
                <div className="notes-form-input-labels">
                  <label className="notes-form-classlabel">Name<span style={{ color: "red" }}>*</span></label>
                </div>
                <input
                  type="text"
                  name="name"
                  required
                ></input>
              </div>

              <div className="horizonInput">
                <div className="horizonclassInput">
                  <div className="notes-form-input-labels">
                    <label className="notes-form-classlabel">Age<span style={{ color: "red" }}>*</span></label>
                  </div>
                  <input
                    type="text"
                    name="branch"
                    value={Age}
                  ></input>
                </div>
                <div className="horizonclassInput">
                  <div className="notes-form-input-labels">
                    <label className="notes-form-classlabel">Sex</label>
                  </div>
                  <input
                    type="text"
                    name="college"
                    value={Sex}
                  ></input>
                </div>
              </div>

              <div className="notes-form-classInput">
                <div className="notes-form-input-labels">
                  <label className="notes-form-classlabel">Biological_structure<span style={{ color: "red" }}>*</span></label>
                </div>
                <input
                  type="text"
                  name="courseName"
                  value={BS}
                ></input>
              </div>

              <div className="notes-form-classInput">
                <div className="notes-form-input-labels">
                  <label className="notes-form-classlabel">Clinical_event<span style={{ color: "red" }}>*</span></label>
                </div>
                <input
                  type="text"
                  name="resourceLink"
                  value={CE}
                  // onChange={handleTextChange}
                ></input>
              </div>
              <div className="notes-form-classInput">
                <div className="notes-form-input-labels">
                  <label className="notes-form-classlabel">Sign_symptom<span style={{ color: "red" }}>*</span></label>
                </div>
                <input
                  type="text"
                  name="resourceLink"
                  value={SS}
                ></input>
              </div>

              <div className="notes-form-classInput">
                <div className="notes-form-input-labels">
                  <label className="notes-form-classlabel">description</label>
                </div>
                <textarea
                  type="text"
                  name="description"
                ></textarea>
              </div>
              <div className="btn_container">
                <button className="uploadBtn" onClick={handleDownload}>Download Form</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
