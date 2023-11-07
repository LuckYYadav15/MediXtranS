import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../App";
import {
  mediXlogo_2,
  Authentication_rafiki,
  vector_eye,
} from "../assets/index.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import Cookies from "js-cookie";
import { Loading } from "../components";

// import jwt from 'jsonwebtoken';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [alreadyClicked, setAlereadyClicked] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkCookie();
    if (isLoggedIn) {
      return navigate("./home");
    }
  }, [isLoggedIn]);

  const checkCookie = () => {
    const myCookieValue = Cookies.get("mediXtrans");
    if (myCookieValue) {
      dispatch(authActions.login());
    } else {
      dispatch(authActions.logout());
    }
  };

  // useEffect(() => {
  //   checkAuthentication();
  // }, [])

  // const checkAuthentication = () => {
  //   const token = localStorage.getItem('mediXtrans');
  //   if (token) {
  //     try {
  //       const decodedToken = jwt.decode(token);
  //       const currentTime = Date.now() / 1000;

  //       // Check if the token is expired
  //       if (decodedToken.exp < currentTime) {
  //         setIsAuthenticated(false);
  //       } else if (decodedToken.aud !== 'https://medixtrans.onrender.com/') {
  //         // Replace 'your-site' with the expected audience for your site
  //         setIsAuthenticated(false);
  //       } else {
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       setIsAuthenticated(false);
  //     }
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(!rememberMe);
  };

  function togglePasswordVisibility(id) {
    var passwordField = document.getElementById(id);
    if (passwordField.type === "password") {
      passwordField.type = "text";
      setTimeout(function () {
        passwordField.type = "password";
      }, 1000);
    } else {
      passwordField.type = "password";
    }
  }

  function isValidEmail(email) {
    // Regular expression for email validation
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email matches the regular expression
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!isValidEmail(email)) {
      console.log("Invalid email");
      return;
    }
    setAlereadyClicked(true);
    // Handle form submission logic here
    // You can access the email, password, and confirmPassword state values here
    try {
      console.log(email, password, confirmPassword);
      const data = await axios.post(
        // "http://localhost:4000/api/v2/users/register",
        // `${server}/users/register`,
        `${server}/api/user/register`,
        {
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          // withCredentials: true,
        }
      );
      navigate("/home");
      setAlereadyClicked(false);
      await dispatch(authActions.login);
      setIsLoading(false);
      console.log(isLoggedIn);
      console.log("Registration successful");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setAlereadyClicked(false);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] flex justify-center items-center">
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center overflow-hidden bg-[#88d2df] h-[100vh] w-[100vw] ">
          <div className=" relative items-center justify-center w-[60%] md:w-[50vw] flex-shrink-0">
            <img
              src={Authentication_rafiki}
              alt="logo"
              className="xl:ml-[35%] mb-[50px]"
            />
          </div>
          <div className="flex items-center justify-center lg:bg-[#ebebeb] w-[100%] md:w-[50vw] h-[100%] ">
            <div className=" w-[331px]  rounded-[25px] bg-[#fff] shadow-[0px,4px,4px,4px] px-[15px] ">
              <div className="my-[10px] items-center justify-center flex flex-row flex-wrap">
                <div className="w-[64px] h-[50px] flex-shrink-0">
                  <img src={mediXlogo_2} alt="logo" />
                </div>
                <div className="flex flex-col text-[#000] flex-shrink-0 text-[19px] font-[Roboto] font-[600]">
                  MediXtranS
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start p-[5%] gap-3 text-[#9C9C9C] font-[Roboto]"
              >
                <div className="flex flex-col">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="border-[1px] border-[#9C9C9C] rounded-md px-2 py-1"
                  />
                </div>
                <div className="flex flex-col justify-start ">
                  <label htmlFor="password">Password</label>
                  <div className="w-[100%] flex flex-row items-center border-[1px] border-[#9C9C9C] rounded-md ">
                    <input
                      type="password"
                      id="passwordField"
                      value={password}
                      onChange={handlePasswordChange}
                      className=" px-2 py-1 rounded-md w-[90%]"
                    />
                    <img
                      src={vector_eye}
                      onClick={() => togglePasswordVisibility("passwordField")}
                      alt=""
                      className=" w-[22px] h-[14.14px]"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start ">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="w-[100%] flex flex-row items-center border-[1px] border-[#9C9C9C] rounded-md ">
                    <input
                      type="password"
                      id="confirmPasswordField"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className=" px-2 py-1 rounded-md w-[90%]"
                    />
                    <img
                      src={vector_eye}
                      id="showButton"
                      onClick={() =>
                        togglePasswordVisibility("confirmPasswordField")
                      }
                      alt=""
                      className=" w-[22px] h-[14.14px]"
                    />
                  </div>
                </div>
                <div className="mt-[10px] flex flex-row text-[12px] justify-between">
                  <div className="flex flex-row gap-2">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <label htmlFor="rememberMe">Remember Me</label>
                  </div>
                  <div>
                    <a href="link" className="text-[#88D2DF]">
                      Forgot Password
                    </a>
                  </div>
                </div>
                <button
                  disabled={alreadyClicked}
                  type="submit"
                  className="bg-[#88D2DF] p-2 rounded-lg font-[Inter] text-[17px] text-[#fff]"
                >
                  Register
                </button>
              </form>
              <div className="flex justify-center text-[12px] text-[#9C9C9C] mb-5">
                Already have Account?{" "}
                <a href="/login" className="text-[#88D2DF] pl-2">
                  Login Here
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
