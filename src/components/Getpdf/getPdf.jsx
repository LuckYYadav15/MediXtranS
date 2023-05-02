import React, { useState } from "react";
import axios from "axios";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const TextToPdf = () => {
  const [text, setText] = useState("");

  const generatePdf = async () => {
    try {
      const response = await axios.get("/text/get");
      const data = response.data.text_data;
      console.log(data);
      setText(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>PDF from API Text</h1>
      {text ? (
        <PDFDownloadLink
          document={<PDFComponent text={text} />}
          fileName="text.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      ) : (
        <button onClick={generatePdf}>Generate PDF</button>
      )}
    </div>
  );
};

const PDFComponent = ({ text }) => {
  return (
    <Document>
      <Page>
        <View>
          <Text>{text}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default TextToPdf;
