import "../styles/check2verify.css";
import { useNavigate } from "react-router-dom";
const Check2verify = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="box">
        <p>Do you have Google Authenticator enabled in your app?</p>
        <div className="buttons">
          <button
            className="no-btn"
            onClick={() => (window.location.href = "https://boltdrop.com/")}
          >
            NO
          </button>
          <button className="yes-btn" onClick={() => navigate("/verify")}>
            YES
          </button>
        </div>
      </div>
    </div>
  );
};

export default Check2verify;
