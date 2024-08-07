import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";
import "../styles/login.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formDetails;
      if (!email || !password) {
        return toast.error("Input fields should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }

      const { data } = await toast.promise(
        axios.post("/user/login", {
          email,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Login successful",
          error: "Unable to log in",
          loading: "Logging in...",
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      const decodedToken = jwt_decode(data.token);
      dispatch(setUserInfo(decodedToken.userId));
      getUser(decodedToken.userId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUser = async (id) => {
    try {
      const user = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(user));
      const isDoctor=localStorage.setItem("user", user.isDoctor);
      if(!isDoctor){
        navigate()
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="form-heading">Sign In</h2>
        <form onSubmit={formSubmit} className="login-form">
          <input
            type="email"
            name="email"
            className="form-input1"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input1"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <button type="submit" className="btn form-btn">
            Sign in
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink className="register-link" to={"/register"}>
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Login;

