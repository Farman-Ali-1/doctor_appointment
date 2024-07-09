import React, { useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const BookAppointment = ({ setModalOpen, ele }) => {
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
    file: null,
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFormDetails({
      ...formDetails,
      file,
    });
  };

  const uploadFile = async () => {
    try {
      const { file } = formDetails;
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "btfrghs3");
      formData.append("cloud_name", "dmywr7fq0");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmywr7fq0/image/upload",
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading file: ", error);
      throw new Error("Error uploading file: " + error.message);
    }
  };


  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadFile();
      await toast.promise(
        axios.post(
          "/appointment/bookappointment",
          {
            doctorId: ele?.userId?._id,
            date: formDetails.date,
            time: formDetails.time,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
            pic: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <h2 className="page-heading">Book Appointment</h2>
          
          <div className="register-container flex-center book">
          <div className="close-btn-container">

          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          </div>
            <form className="register-form">
            <div className="form-group1">
              
              <input
                type="date"
                name="date"
                className="form-input1"
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type="time"
                name="time"
                className="form-input1"
                value={formDetails.time}
                onChange={inputChange}
              />
      {ele.phone &&(        
       <div className="row-container">
  <p className="phone">
    <strong>Easypaisa Number: </strong>
    {ele?.phone}
  </p>
  </div>
      )}
  <label htmlFor="transaction-pic">Attach Transaction Screenshot</label>
  <input
    type="file"
    name="transaction-pic"
    id="transaction-pic"
    className="form-input1"
    onChange={onFileChange}
  />

              <button
                type="submit"
                className="btn form-btn"
                onClick={bookAppointment}
              >
                book
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
