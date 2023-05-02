import React, { useState } from "react";
import axios from "axios";
import query from "./queryTrans"; // assuming the file containing the function is named query.js
import LoadingPage from "../components/Loading/loading";

function MyComponent() {
  const [inputs, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const [intext, setinText] = useState("");
  const [outext, setoutText] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [loading, setLoading] = useState(false); // added state for loading animation

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    setInputArray((prevInputArray) => [...prevInputArray, inputs]); // add the input value to the existing array of inputs
    const data = { inputs }; // assuming the API takes an object with an "input" field
    const result = await query(data);
    setOutput((prevOutput) => [...prevOutput, result]); // append the result to the existing array of outputs
    for (let i = 0; i < result.length; i++) {
      console.log(result[i].word, result[i].score, result[i].entity_group);
    }
    setLoading(false);
  };

  const handleTextSubmit = async (event) => {
    event.preventDefault();
    const data = { inputs }; // assuming the API takes an object with an "input" field
    const result = await query(data);
    setOutput((prevOutput) => [...prevOutput, result]);
    for (let i = 0; i < result.length; i++) {
      console.log(result[i].word, result[i].score, result[i].entity_group);
    }
  };

  const handleFindOne = async () => {
    setLoading(true); // show loading animation before fetch request
    try {
      const response = await axios.get("/text/get");
      const lastElement = response.data;
      setInput(lastElement.text_data);
      console.log(lastElement.text_data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getEntityColor = (entity_group) => {
    switch (entity_group) {
      case "Detailed_description":
        return "red";
      case "age":
        return "yellow";
      case "history":
        return "blue";
      case "nonbiological_location":
        return "violet";

      case "Disease_disorder":
        return "green";

      case "Diagnostic_procedure":
        return "orange";

      case "Lab_value":
        return "brown";

      case "Distance":
        return "gray";

      case "Clinical_event":
        return "aqua";

      case "Sign_symptom":
        return "Brown";

      case "Biological_structure":
        return "lime";

      case "Frequency":
        return "Maroon";

      default:
        return "black";
    }
  };

  const outputList = output.map((result, index) => {
    const highlightedText = [];
    let lastIndex = 0;
    console.log(result.length);
    console.log(inputs)
    for (let i = 0; i < result.length; i++) {
      const { start, end, score, entity_group } = result[i];
      console.log(result[i]);
      const color = getEntityColor(entity_group);
      const textChunk = inputs.substring(lastIndex, start);
      console.log(textChunk)
      const entityChunk = inputs.substring(start, end);
      console.log(entityChunk)
      if (textChunk) {
        highlightedText.push(<span key={lastIndex}>{textChunk}</span>);
      }

      highlightedText.push(
        <span
          key={start + "-" + end}
          style={{
            color: "black",
            fontSize: score >= 0.5 && entity_group ? "110%" : "100%",
            backgroundColor: score >= 0.5 ? color : "transparent",
          }}
        >
          {entityChunk} <b>{entity_group} </b>
        </span>
      );
      lastIndex = end;
    }

    if (lastIndex < intext.length) {
      highlightedText.push(
        <span key={lastIndex}>{intext.substring(lastIndex)}</span>
      );
    }

    // console.log(highlightedText[0]);

    return (
      <div key={index}>
        <p>{highlightedText}</p>
      </div>
    );
  });

  // const outputList = output.map((result, index) => (
  //   <div key={index}>
  //     <p>
  //       {result.map(({ word, score, entity_group }) => {
  //         let color = "black";
  //         switch (entity_group) {
  //           case "Detailed_description":
  //             color = "red";
  //             break;
  //           case "age":
  //             color = "yellow";
  //             break;
  //           case "history":
  //             color = "blue";
  //             break;
  //           case "nonbiological_location":
  //             color = "violet";
  //             break;
  //           case "Disease_disorder":
  //             color = "green";
  //             break;
  //           case "Diagnostic_procedure":
  //             color = "orange";
  //             break;
  //           case "Lab_value":
  //             color = "brown";
  //             break;
  //           case "Distance":
  //             color = "gray";
  //             break;
  //           case "Clinical_event":
  //             color = "aqua";
  //             break;
  //           case "Sign_symptom":
  //             color = "Brown";
  //             break;
  //           case "Biological_structure":
  //             color = "lime";
  //             break;
  //           case "Frequency":
  //             color = "Maroon";
  //             break;
  //           default:
  //             color = "black";
  //         }
  //         return (
  //           <span
  //             key={word}
  //             style={{
  //               color: score >= 0.5 ? color : color,
  //               fontSize: score >= 0.5 && entity_group ? "80%" : "100%",
  //             }}
  //           >
  //             {word} {score >= 0.5 && entity_group ? `(${entity_group})` : null}
  //           </span>
  //         );
  //       })}
  //     </p>
  //   </div>
  // ));

  if (loading) {
    // show loading animation if loading state is true
    return <LoadingPage />;
  }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%", marginRight: "20px" }}>
        <button
          style={{ marginBottom: "50px", alignItems: "center" }}
          onClick={handleFindOne}
        >
          Get Data
        </button>
        <form onSubmit={handleSubmit}>
          <textarea
            style={{ alignItems: "center" }}
            rows={10}
            cols={100}
            type="text"
            value={inputs}
            onChange={(e) => setInput(e.target.value)}
          />
          <button style={{ alignItems: "center" }} type="submit">
            Compute
          </button>
        </form>
      </div>
      <div style={{ width: "50%" }}>
        {outputList}
      </div>
    </div>
  );
}

export default MyComponent;
