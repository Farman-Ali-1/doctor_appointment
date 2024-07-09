import React, { useEffect, useState } from "react";
import axios from "axios";
import fetchData from "../helper/apiCall";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LabCard from "../components/LabCard";

const MyLab = () => {
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLab = async () => {
      
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetchData("/lab/getLab");
        setLab(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getLab();
  }, []);

  const deleteLab = async () => {
    try {
      const response = await axios.delete("/lab/deleteLab");
      console.log(response.data);
      // Handle successful deletion (e.g., show a message, update UI)
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <Navbar />
      <section className="container notif-section">
        {/* <div className="register-container flex-center contact"> */}
        <h2 className="page-heading">My Lab</h2>
          {loading ? (
            <p>Loading lab details...</p>
          ) : lab && lab.length > 0 ? (
            <div className="appointments">
                {lab.map((ele) => {
                return (
                  <LabCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
            </div>
          ) : (
            <p>No Labs Found</p>
          )}
        {/* </div> */}
      </section>
      <Footer />
    </>
  );
};

export default MyLab;
