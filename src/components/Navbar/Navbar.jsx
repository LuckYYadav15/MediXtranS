import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function BasicExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // You can put your login check code here to update the isLoggedIn state
    // For example, you can check if the user has an authentication token in localStorage
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(authToken !== true);
  }, []);

  function handleLogout() {
    // You can put your logout code here to clear the authentication token and update the isLoggedIn state
    localStorage.removeItem("authToken");
    navigate("/login");
    setIsLoggedIn(false);
  }
  const handleLogoClick = () => {
    navigate("/landing");
  };
  const navigate = useNavigate();
  const routeLogin = () => {
    navigate("/login");
  };
  const routeSignup = () => {
    navigate("/register");
  };
  return (
    <nav>
      <div class="navbar-brand">
        <img
          style={{
            width: "100%",
            height: "400%",
            marginLeft: "-5px",
            marginTop: "-25px",
            cursor: "pointer",
          }}
          src={process.env.PUBLIC_URL + "/mediXlogo.png"}
          alt="My Image"
        />
      </div>
      <div onClick={handleLogoClick} style={{ marginLeft: "-40px" , cursor: "pointer"}}>
        MediXtrans
      </div>

      <div class="navbar-items">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "black" }}
          >
            LOGOUT
          </button>
        ) : (
          <>
            <button
              onClick={routeLogin}
              style={{ marginLeft: "10px", cursor: "pointer", color: "black" }}
            >
              LOGIN
            </button>
            <button
              onClick={routeSignup}
              style={{
                borderRadius: "20px",
                padding: "8px",
                color: "white",
                backgroundColor: "#3d919c",
              }}
            >
              SIGN UP
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default BasicExample;
