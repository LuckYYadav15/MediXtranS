import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import LoadingPage from "../components/Loading/loading";
import { FastForward } from "react-bootstrap-icons";
import "./Login.css";

function Login() {
  const [cookies] = useCookies([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/auth/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/home");
        }
      }
      setLoading(false);
    } catch (ex) {
      console.log(ex);
    }
  };
  if (loading) {
    // show loading animation if loading state is true
    return <LoadingPage />;
  }
  return (
      <div className="row-container">
        <img
          style={{
            width: "100%",
            height: "400%",
            marginLeft: "-150px",
            marginTop: "40px",
          }}
          src={process.env.PUBLIC_URL + "/mediXlogo.png"}
          alt="My Image"
        />
        <div style={{ width: "400px" }} className="login-container">
          <h2>Login to your Account</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <button type="submit">Submit</button>
            <span>
              Don't have an account ?<Link to="/register"> Register </Link>
            </span>
          </form>
          <ToastContainer />
        
      </div>
    </div>
  );
}

export default Login;
