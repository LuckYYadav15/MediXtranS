import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import SpeechToText from './pages/speechTotext'
import AboutUs from "./components/About Us/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import Trans from "./pages/Transcription";
import "react-toastify/dist/ReactToastify.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/speech" element={<SpeechToText />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Cards />} />
      <Route path="/trans" element={<Trans />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/profile/:username" element={<Profile />} />  */}
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
// import React from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const App = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition({});

//   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//     return null;
//   }

//   return (
//     <div>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default App;
