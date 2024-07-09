import React from "react";
import image from "../images/heroimg.jpg";
import image1 from "../images/image2.jpg";
import image2 from "../images/image3.jpg";

import "../styles/hero.css";

const Hero = () => {
  const role = localStorage.getItem("role");
const token = localStorage.getItem("token");
  return (
    <>
    <section className="hero">
      <div className="hero-content">
        <h1>
          Your Health, <br />
          Our Responsibility
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          tenetur doloremque molestias repellat minus asperiores in aperiam
          dolor, quaerat praesentium.
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
    
    <section className="container1">
            <div>
        <img
        src={image1}
        alt="image1"
        />
      </div>
      <div>
        <img
        src={image2}
        alt="image2"
        />
      </div>
      <a href="/doctors" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>Doctors</h3>
            <p>Book Appointment With Our <b>Professional And Verified</b> Doctors</p>
          </div>
        </a>
        { token && role !== 'Lab Assistant' && (

        <a href="/appointments" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>Appointments</h3>
            <p>View Your <b>Appointments</b></p>
          </div>
        </a>
        )}
          {token && role !== 'Doctor' && role !== 'Lab Assistant' && (
        <a href="/applyfordoctor" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>Apply for doctor</h3>
            <p>Apply To <b>Work As A Doctor</b> With Us</p>
          </div>
        </a>
        )}
          {token && role !== 'Lab Assistant' && role !== 'Doctor' && (
        <a href="/registerlab" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>Register Lab</h3>
            <p>Register <b>Your Lab</b> With Us</p>
          </div>
        </a>
           )}
       {token && role !== 'Client' && role !== 'Doctor' && (
        <a href="/mylab" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>My Lab</h3>
            <p>Go To Your <b>Lab</b> And Write <b>Reports</b></p>
          </div>
        </a>
       )}
       {token &&(
        <a href="/profile" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>Profile</h3>
            <p>Edit <b>Your Profile</b></p>
          </div>
        </a>
        )}
        {token && role !== 'Client' && role !== 'Lab Assistant' &&(
        <a href="/prescriptions" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>Prescription</h3>
            <p><b>Write Prescription</b> To The Patients Appointed</p>
          </div>
        </a>
        )}
        {token &&(
        <a href="/history" className="navcard">
          <img src={image2} alt="image2" />
          <div className="navcard-content">
            <h3>History</h3>
            <p>See <b>Prescriptions History</b></p>
          </div>
        </a>
        )}
        {!token &&(
        <a href="/login" className="navcard">
        <img src={image2} alt="image2" />
        <div className="navcard-content">
          <h3>Login</h3>
          <p>Log Into <b>Your Account</b> To Use Our Services</p>
        </div>
      </a>

        )}

    </section>
    
    </>
  );
};

export default Hero;
