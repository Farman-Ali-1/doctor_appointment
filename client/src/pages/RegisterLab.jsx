import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/registerLab.css'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const RegisterLab = () => {
  const [labName, setLabName] = useState('');
  const [labDetails, setLabDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const token = localStorage.getItem("token");
      console.log(token);
  
      await toast.promise(
        axios.post("/lab/registerLab", {
          labName,
          labDetails
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Registering Lab...",
          success: "Registration successful",
          error: "Unable to register Lab...",
        }
      );
  
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === "Lab name already exists.") {
          toast.error("Lab name already exists. Please choose a different name.");
        } else if (error.response.data.error === "A doctor cannot be a lab assistant.") {
          toast.error("A doctor cannot be a lab assistant.");
        } else if (error.response.data.error === "One lab assistant can have only one lab.") {
          toast.error("One lab assistant can have only one lab.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <>
      <Navbar />
      <section className="register-section">
        <div className="register-container">
          <h2 className="form-heading">Register Lab</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-input1"
              placeholder='Enter Lab Name'
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
            />

            <input
              type="text"
              className="form-input1"
              placeholder='Enter Lab Details'
              value={labDetails}
              onChange={(e) => setLabDetails(e.target.value)}
            />
            <button type="submit" className="btn form-btn">Register Lab</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RegisterLab;
