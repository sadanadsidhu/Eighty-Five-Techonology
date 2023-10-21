import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { LogInAPI } from "../../API/allAPI";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

function LoginForm() {
  const [formData, setFormData] = useState({
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
      const response = await LogInAPI(formData);
      if (response.data) {
        navigate("/");
      }
      localStorage.setItem("userid", response.data.userid);
    } catch (error) {
      // Handle errors, e.g., display an error message
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login">
      <div className="card">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              size="small"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button variant="contained" type="submit">Log In</Button>
          </form>
      </div>
    </div>
  );
}

export default LoginForm;
