import React from "react";
import "./ChooseFile.css";

function FileInputComponent(props) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    props.onFileSelect(selectedFile);
  };

  return (
    <div>
      {/* <label htmlFor="file_input">Choose a file:</label> */}
      <button className="fileInput">
        <input
          type="file"
          style={{ width: "350px" }}
          accept="audio/*"
          id="fileInput"
          onChange={handleFileChange}
        />
      </button>
    </div>
  );
}

export default FileInputComponent;
