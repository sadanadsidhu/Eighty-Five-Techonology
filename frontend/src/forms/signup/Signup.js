import React, { useState } from "react";
import axios from "axios";
import "../login/login.scss";
import { useNavigate } from "react-router-dom";
import { SignUpAPI } from "../../API/allAPI";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await SignUpAPI(formData);
      if (response.data) {
        navigate("/login");
      }

      // Reset the form fields after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <h2>Signup Form</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            type="text"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
