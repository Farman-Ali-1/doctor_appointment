import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import fetchData from '../helper/apiCall';
import axios from 'axios'; // Import Axios
import toast from 'react-hot-toast';
import "../styles/history.css"; // Import history.css

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


const History = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const userId = localStorage.getItem("user");
    const isDoctor = localStorage.getItem("role") === 'Doctor';
    const isLabAssistant = localStorage.getItem("role") === 'Lab Assistant';
    const isClient = localStorage.getItem("role") === 'Client';

    console.log('isDoctor: ', isDoctor);
    console.log('isLabAssistant: ', isLabAssistant);

    console.log('user: ', userId);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.root);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                dispatch(setLoading(true));
                let endpoint = '/prescription/all';

                if( isClient){
                  endpoint ='/prescription/'
                }
                else if (isLabAssistant) {
                    endpoint = '/prescription/lab-pres';
                }
                else if(isDoctor){
                    endpoint = '/prescription/doc-pres';
                }
                const response = await fetchData(endpoint);
                setPrescriptions(response);
                dispatch(setLoading(false));
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
    
        fetchPrescriptions();
    }, []);
    
    const handleDelete = async (prescriptionId, type) => {
        try {
          await toast.promise(
            axios.delete(
              "/prescription/deletePrescription",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: { _id: prescriptionId, type: type }, // Include _id and type in the request body
              }
            ),
            {
              success: "Prescription Deleted Successfully",
              error: "Unable to Delete Prescription",
              loading: "Deleting Prescription...",
            }
          );
      
          // Filter out the deleted prescription from the state
          const updatedPrescriptions = prescriptions.filter(p => p._id !== prescriptionId);
          setPrescriptions(updatedPrescriptions);
          dispatch(setLoading(false));
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
      
    

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-PK', { timeZone: 'UTC' });
    };

    return (
        <>
            <Navbar />
            {loading ? (
                <Loading />
            ) : (
                <section className="container notif-section">
                    <h2 className="page-heading">Prescription History</h2>
                    {prescriptions.length > 0 ? (
                        <div className='appointments'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Data</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptions.map(prescription => (
                                        <tr key={prescription._id}>
                                            <td>{prescription.type}</td>
                                            <td>{prescription.data}</td>
                                            <td>{formatTimestamp(prescription.timestamp)}</td>
                                            <td><button className='btn form-btn' onClick={() => handleDelete(prescription._id, prescription.type)}>Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <Empty />
                    )}
                </section>
            )}
            <Footer />
        </>
    );
};

export default History;
