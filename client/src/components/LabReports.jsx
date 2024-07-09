import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Select from "react-select";
import fetchData from "../helper/apiCall";
import "../styles/LabReports.css";
import { IoMdClose } from "react-icons/io";


const LabReports = () => {
  const [formDetails, setFormDetails] = useState({
    patientId: "",
    report: "",
    appointmentId: "",
    labassistantId: ""
  });

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchData("/prescription/lab")
      .then(response => {
        setPatients(response);
      })
      .catch(error => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    const selectedPatient = patients.find(p => p._id === selectedOption.value);
    setFormDetails({
      ...formDetails,
      patientId: selectedOption.value,
      appointmentId: selectedPatient.appointmentId,
      labassistantId: selectedPatient.labassistantId,
    });
  };

  const submitLabReport = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axios.post(
          "/prescription/labReport",
          {
            patientId: formDetails.patientId,
            report: formDetails.report,
            appointmentId: formDetails.appointmentId,
            labassistantId: formDetails.labassistantId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Lab report saved successfully",
          error: "Failed to save lab report",
          loading: "Saving lab report...",
        }
      );
    } catch (error) {
      console.error("Error saving lab report:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || error.message);
  }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="page-heading">Submit Lab Report</h2>
        <div className="register-container">
          <form className="register-form" onSubmit={submitLabReport}>
            <Select
              options={patients.map(report => ({
                value: report._id,
                label: report.PatientName
              }))}
              onChange={handleSelectChange}
              placeholder="Select Patient"
              className="select-patient"
            />
            {formDetails.patientId && (
              <div className="patient-info">
                <p><strong>Type:</strong> {patients.find(p => p._id === formDetails.patientId).type}</p>
                <p><strong>Data:</strong> {patients.find(p => p._id === formDetails.patientId).data}</p>
                <p><strong>Timestamp:</strong> {patients.find(p => p._id === formDetails.patientId).timestamp}</p>
              </div>
            )}
            <textarea
              name="report"
              placeholder="Lab Report"
              className="form-input"
              value={formDetails.report}
              onChange={inputChange}
              required
            />
            <button type="submit" className="btn form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LabReports;
