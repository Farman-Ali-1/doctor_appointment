import "../styles/labCard.css";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LabCard = ({ ele }) => {
  const [token] = React.useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (token === "") {
      toast.error("You must log in first");
    } else {
      navigate("/labreports");
    }
  };

  return (
    <div className={`card`}>
      <p className="specialization">
        <strong>User ID: </strong>
        {ele?.userId}
      </p>
      <p className="specialization">
        <strong>Lab Name: </strong> {ele?.labName}
      </p>
      <p className="specialization">
        <strong>Lab Details: </strong> {ele?.labDetails}
      </p>
      <button className="btn appointment-btn" onClick={handleNavigate}>
        Lab Reports
      </button>
    </div>
  );
};

export default LabCard;
