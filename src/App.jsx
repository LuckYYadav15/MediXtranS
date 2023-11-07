import {Navbar} from "./components";
import {Login,Register,Upload,Transcription,Record, Home, LandingPage} from "./pages";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// export const server = "https://medixtrans.onrender.com/api/v2";
export const server = "https://medibackend.onrender.com";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/login" element={<Login />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="/record" element={<Record />} />,
    <Route path="/upload" element={<Upload />} />,
    <Route path="/transcription" element={<Transcription />} />,
    <Route path="/home" element={<Home />} />,
    <Route path="/" element={<LandingPage />} />,
  ])
);
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
