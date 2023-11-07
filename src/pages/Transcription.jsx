import React, { useRef, useState, useEffect } from "react";
import axios from "axios"; // Import Axios library
import { audit, vector_down, vector_send } from "../assets";
import { Footer, Navbar } from "../components";
import { PDFDocument, rgb } from "pdf-lib";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


export default function Transcription() {
  const [transResult, setTransResult] = useState([]);
  const targetRef = useRef(null);
  const navigate = useNavigate();
  // const [transResult, setTransResult] = useState("");

  const [inputs, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const [intext, setinText] = useState("");
  const [outext, setoutText] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const result = [];

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://medibackend.onrender.com/api/text/get"
        );
        setInput(response.data.text_data);
        const postResponse = await fetch(
          "https://api-inference.huggingface.co/models/d4data/biomedical-ner-all",
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer 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",
              "Content-Type": "application/json", // Specify the content type
            },
            body: JSON.stringify(response.data.text_data),
          }
        );

        if (!postResponse.ok) {
          throw new Error("Failed to fetch data from Hugging Face API");
        }

        setInputArray((prevInputArray) => [...prevInputArray, inputs]);
        const result = await postResponse.json();
        console.log("api hit request");
        console.log(result);
        // transResult = result;
        // console.log(transResult);
        setOutput((prevOutput) => [result]);
        for (let i = 0; i < result.length; i++) {
          const { word, entity_group } = result[i];
          console.log(entity_group);
          if(entity_group === "Age") {
            localStorage.setItem("medixTransGenerateFormAge",word);
          }
          if(entity_group == "Sex"){
            localStorage.setItem("medixTransGenerateFormSex",word);
          }
          if(entity_group == "Biological_structure"){
            localStorage.setItem("medixTransGenerateFormBS",word);
          }
          if(entity_group == "Clinical_event"){
            localStorage.setItem("medixTransGenerateFormCE",word);
          }
          if(entity_group == "Sign_symptom"){
            localStorage.setItem("medixTransGenerateFormSS",word);
          }
          
          // console.log(result[i].word, result[i].score, result[i].entity_group);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log(transResult);

  

  const handleGenerateFormClick = async() => {
    // console.log(transResult[0].entity_group);

    // await fun();
    // for(let i=0; i<transResult.length; i++) {
    //   const { start, end, score, entity_group } = result[i];
    //   console.log(entity_group)
    //   // console.log(transResult[i].entity_group)
    //   // if(transResult[i].entity_group == "Age") {
    //   //   localStorage.setItem("medixTransGenerateFormAge",transResult[i].word);
    //   // }
    //   // else if(transResult[i].entity_group === "Disease_disorder") {
    //   //   localStorage.setItem("medixTransGenerateFormDisease_disorder",transResult[i].word);
    //   // }
    // }
    // localStorage.setItem("medixTransGenerateForm",transResult[0].entity_group);
    // localStorage.setItem("medixTransGenerateForm",transResult[0].);
    // localStorage.setItem("medixTransGenerateForm",transResult[0]);
    // localStorage.setItem("medixTransGenerateForm",transResult[0]);
    // localStorage.setItem("medixTransGenerateForm",transResult[0]);
    navigate("/generateForm", { state: { resultData: transResult } });
  };

  const getEntityColor = (entity_group) => {
    const colors = {
      Detailed_description: {
        light: "#FF99D8", // Lighter shade of pink
        dark: "#D72B6B", // Darker shade of pink
      },
      Age: {
        light: "#BAA7FF", // Lighter shade of purple
        dark: "#6236B2", // Darker shade of purple
      },
      History: {
        light: "#FFC266", // Lighter shade of orange
        dark: "#FF7F00", // Darker shade of orange
      },
      Nonbiological_location: {
        light: "#E5CCFF", // Lighter shade of violet
        dark: "#7E61B2", // Darker shade of violet
      },
      Disease_disorder: {
        light: "#A7FFA7", // Lighter shade of green
        dark: "#287C28", // Darker shade of green
      },
      Diagnostic_procedure: {
        light: "#FFD699", // Lighter shade of orange
        dark: "#FF9900", // Darker shade of orange
      },
      Lab_value: {
        light: "#99D6FF", // Lighter shade of blue
        dark: "#006699", // Darker shade of blue
      },
      Distance: {
        light: "#E0E0E0", // Lighter shade of gray
        dark: "#808080", // Darker shade of gray
      },
      Coreference: {
        light: "#66FFFF", // Lighter shade of aqua
        dark: "#009999",
      },
      Clinical_event: {
        light: "#66FFFF", // Lighter shade of aqua
        dark: "#009999", // Darker shade of aqua
      },
      Sign_symptom: {
        light: "#B3C6FF", // Lighter shade of blue
        dark: "#4364A4", // Darker shade of blue
      },
      Biological_structure: {
        light: "#C2FFC2", // Lighter shade of green
        dark: "#2E8B57", // Darker shade of green
      },
      Frequency: {
        light: "#FF9999", // Lighter shade of red
        dark: "#B22222", // Darker shade of red
      },
      Sex: {
        light: "#A7FFA7", // Lighter shade of green
        dark: "#287C28", // Darker shade of green
      },
      Therapeutic_procedure: {
        light: "#D6FF99", // Lighter shade of olive
        dark: "#698B22", // Darker shade of olive
      },
    };

    // Check if the entity_group exists in the colors object
    if (entity_group in colors) {
      return colors[entity_group];
    } else {
      return { light: "yellow", dark: "darkyellow" }; // Default color
    }
  };

  const outputList = output.map((result, index) => {
    const highlightedText = [];
    let lastIndex = 0;
    // console.log(result.length);
    // console.log(inputs);
    for (let i = 0; i < result.length; i++) {
      const { start, end, score, entity_group } = result[i];
      // console.log(result[i]);
      const entityChunkColor = getEntityColor(entity_group).light;
      const entityNameColor = getEntityColor(entity_group).dark;
      const textChunk = inputs.substring(lastIndex, start);
      // console.log(textChunk);
      const entityChunk = inputs.substring(start, end);
      // console.log(entityChunk);
      if (textChunk) {
        highlightedText.push(<span key={lastIndex}>{textChunk}</span>);
      }

      highlightedText.push(
        <span
          key={start + "-" + end}
          style={{
            color: "black",
            fontSize: score >= 0.5 && entity_group ? "110%" : "100%",
            backgroundColor: score >= 0.5 ? entityNameColor : "transparent",
            marginRight: "5px",
            borderRadius: "5px",
          }}
        >
          <b
            style={{
              backgroundColor: score >= 0.5 ? entityChunkColor : "transparent",
            }}
          >
            {entityChunk}
          </b>{" "}
          <b
            style={{
              color: score < 0.5 ? "black" : "white",
              z: "10",
              fontSize: score < 0.5 ? "0%" : "70%",
            }}
          >
            {entity_group}{" "}
          </b>
        </span>
      );
      lastIndex = end;
    }

    if (lastIndex < intext.length) {
      highlightedText.push(
        <span key={lastIndex}>{intext.substring(lastIndex)}</span>
      );
    }

    // console.log(highlightedText);

    return (
      <div key={index}>
        <p>{highlightedText}</p>
      </div>
    );
  });

  // Function to convert React elements to plain text
  function convertReactElementsToText(reactElements) {
    return reactElements
      .map((element) => {
        if (typeof element === "string") {
          return element; // If it's a string, keep it as is
        } else if (React.isValidElement(element)) {
          // If it's a React element, extract the text content
          return convertReactElementsToText(
            React.Children.toArray(element.props.children)
          );
        }
        return "";
      })
      .join("");
  }

  // Create plain text from the outputList
  // console.log(outputList);
  const textToConvert = convertReactElementsToText(outputList);
  // console.log("text to convert",textToConvert);
  // console.log(typeof textToConvert);

  // Now, you can use the textToConvert to create the PDF
  // Follow the previous code for generating and downloading the PDF

  // Define a function to generate and download the PDF

  const generateAndDownloadPdf = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      // const initialPage = pdfDoc.addPage([800, 600]); // Adjust dimensions as needed
      const fontSize = 10;
      // const maxWidth = initialPage.getWidth() - 100; // Adjust as needed
      // const lineHeight = 1.2 * fontSize; // Line height as a multiple of font size
      // const margin = 50; // Margin from page edges

      // Function to add a new page with the same dimensions
      const addNewPage = () => {
        const newPage = pdfDoc.addPage([800, 600]); // Adjust dimensions as needed
        return newPage;
      };

      // Function to wrap and draw text on a page
      const drawWrappedText = (page, text) => {
        const maxWidth = page.getWidth() - 100;
        const margin = 50;
        const lineHeight = 40;
        let y = page.getHeight() - 50;
        const words = text.split(" ");
        let currentLine = "";

        for (const word of words) {
          const currentText = currentLine ? `${currentLine} ${word}` : word;
          const width = currentText.length * (fontSize / 2); // Adjust as needed

          if (width <= maxWidth) {
            if (currentLine) currentLine += ` ${word}`;
            else currentLine = word;
          } else {
            page.drawText(currentLine, {
              x: margin,
              y,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
            y -= lineHeight;
            currentLine = word;
          }
        }

        // Draw the last line
        if (currentLine) {
          page.drawText(currentLine, {
            x: margin,
            y,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
        }
      };

      // Split text into paragraphs if needed
      const paragraphs = textToConvert.split("\n");
      let page = addNewPage();
      for (const paragraph of paragraphs) {
        if (page.getHeight() <= 100) {
          page = addNewPage(); // Start a new page when current page is full
        }
        drawWrappedText(page, paragraph);
      }

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the bytes
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // Create a temporary download link and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = "transcription.pdf"; // Set the desired file name
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="w-[100vw] md:mx-[30px] flex flex-col flex-wrap items-center justify-center lg:flex-row md:p-[5%]">
        <div className="flex-[6] md:w-[100%] h-[100%] flex flex-col flex-wrap justify-between">
          <div className="h-[60%] m-0 p-[10px] md:p-0 flex-1 flex flex-col">
            <h2 className="text-[#FFC727] text-[40px] md:text-[48px] lg:text-[60px] font-[700]">
              Get Name Entity Recognition
            </h2>
            <p className="text-[20px] font-[300] mt-5">
              get transcription report of recent recorded/uploaded inputs
              document.
            </p>
          </div>
          <div className="flex-1 mt-12 justify-center items-center text-[22px] font-[Roboto] font-[700] flex flex-col md:flex-row md:justify-start">
            <button
              className="w-[242px] h-[44px] shrink-0 justify-center mt-2 sm:mt-0 rounded-[6px] bg-white text-[#6A6868] border-2 border-[#6A6868]"
              type="submit"
            >
              <p
                onClick={scrollToTarget}
                className="font-[Roboto] font-[700] flex flex-row justify-evenly items-center"
              >
                <div>Transcription Report</div>
                <div>
                  <img src={vector_down} alt="" />
                </div>
              </p>
            </button>
          </div>
        </div>
        <div className="flex-[4] flex justify-center shrink-0">
          <div>
            <img width={"632px"} height={"632px"} src={audit} alt="" />
          </div>
        </div>
      </div>
      <hr style={{ height: "3px", backgroundColor: "black" }} />
      <div className="flex items-center justify-center text-[40px] p-5 md:text-[56px] font-[700] font-[Roboto] mt-5 sm:mt-12 text-[#555555]">
        <h1>Here’s the transcription report</h1>
      </div>
      <div
        ref={targetRef}
        className="flex justify-center flex-col py-[30px] sm:py-[80px] p-5 md:p-[100px] lg:flex-row"
      >
        <div className="flex-[5] border-2 w-auto h-auto flex justify-center lg:w-[680px] lg:h-auto lg:h-max-[680px]  shrink-0 shadow-md p-3 md:text-[19px] font-[Roboto] font-[300]">
          <p className="w-full text-justify overflow-scroll">{outputList}</p>
        </div>
      </div>
      <div className="my-8 justify-center items-center text-[22px] font-[Roboto] font-[700] flex flex-col sm:flex-row ">
        <button
          className="w-[197px] h-[44px] shrink-0 justify-center bg-[#6A6868] rounded-[6px] text-white"
          type="button"
          onClick={generateAndDownloadPdf}
        >
          <p className="font-[Roboto] font-[700]">Download pdf</p>
        </button>
        <button
          className="w-[197px] h-[44px] shrink-0 justify-center mt-2 sm:mt-0 rounded-[6px] bg-white text-[#6A6868] sm:ml-[45px] border-2 border-[#6A6868]"
          onClick={handleGenerateFormClick}
        >
          <p className="font-[Roboto] font-[700] flex flex-row justify-evenly items-center">
            <div>Generate Form</div>
            <div>
              <img src={vector_send} alt="" />
            </div>
          </p>
        </button>
      </div>
      <Footer />
    </div>
  );
}
