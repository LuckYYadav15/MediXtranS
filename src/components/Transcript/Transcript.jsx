import React, { useState, useEffect } from "react";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  const handleStart = () => {
    setIsRecording(true);
    recognition.start();
  };

  const handleStop = () => {
    setIsRecording(false);
    recognition.stop();
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      setText(transcript);
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start();
      }
    };

    return () => {
      recognition.stop();
    };
  }, [isRecording]);

  return (
    <div>
      <form>
        <div style={{ padding: "10px 10px", marginLeft: "40%", width: "60px" }}>
          <button onClick={isRecording ? handleStop : handleStart}>
            {isRecording ? "Stop" : "Start"}
          </button>
        </div>
        <textarea
          value={text}
          rows={10}
          cols={100}
          onChange={(e) => setText(e.target.value)}
        />
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

export default SpeechToText;
