import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
function BasicExample() {
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
          }}
          src={process.env.PUBLIC_URL + "/mediXlogo.png"}
          alt="My Image"
        />
      </div>
      <div style={{ marginLeft: "-40px" }}>MediXtrans</div>

      <div class="navbar-items">
        <button
          onClick={routeLogin}
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            color: "black",
          }}
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
      </div>
    </nav>
  );
}

export default BasicExample;
