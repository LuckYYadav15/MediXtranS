import "./sendMail.css";
import { useState } from "react";
import { send } from "emailjs-com";

function SendMail() {
  const [toSend, setToSend] = useState({
    from_name: "",
    to_name: "",
    message: "",
    reply_to: "",
  });

  const [pdfFile, setPdfFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const emailData = { ...toSend };
    if (pdfFile) {
      emailData.attachment = pdfFile;
    }
    send(
      "service_oavhsoq",
      "template_58doa9q",
      emailData,
      "AFKxhQ7sKPWndvcXK"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  const handlePdfFile = (e) => {
    setPdfFile(e.target.files[0]);
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="from_name"
          placeholder="from name"
          value={toSend.from_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="to_name"
          placeholder="to name"
          value={toSend.to_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="message"
          placeholder="Your message"
          value={toSend.message}
          onChange={handleChange}
        />
        <input
          type="text"
          name="reply_to"
          placeholder="Receiver's email"
          value={toSend.reply_to}
          onChange={handleChange}
        />
        <input type="file" name="pdfFile" onChange={handlePdfFile} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SendMail;
