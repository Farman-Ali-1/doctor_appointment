// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import fetchData from '../helper/apiCall';
// import toast from 'react-hot-toast';
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import "../styles/contact.css";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// const AddPrescription = () => {
//     const [patients, setPatients] = useState([]);
//     const [selectedPatientId, setSelectedPatientId] = useState('');
//     const [selectedType, setSelectedType] = useState(null);
//     const [data, setData] = useState('');
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const fetchPatients = async () => {
//             try {
//                 const response = await fetchData(`/user/getuserswithAppointment`);
//                 setPatients(response);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handlePatientSelect = (selectedOption) => {
//         setSelectedPatientId(selectedOption.value);
//     };

//     const handleTypeSelect = (selectedOption) => {
//         setSelectedType(selectedOption);
//     };

//     const handleCreatePrescription = async (e) => {
//         e.preventDefault(); // Prevent form submission

//         try {
//             const selectedPatient = patients.find(patient => patient.user._id === selectedPatientId);
//             if (!selectedPatient) {
//                 throw new Error('Selected patient not found');
//             }

//             await toast.promise(
//                 axios.post(
//                     "/prescription/writePrescription",
//                     {
//                         patientId: selectedPatient.user._id, // Use selectedPatient.user._id
//                         type: selectedType.value,
//                         appointmentId: selectedPatient.appointmentId,
//                         data
//                     },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }
//                 ),
    //             {
    //                 success: `${selectedType.value} ${selectedType.value ==='prescription'?'Created':'Assigned'} Successfully`,
    //                 error: `Unable to Create ${selectedType.value}`,
    //                 loading: `${selectedType.value ==='prescription'?'Creating':'Assigning'} ${selectedType.value}...`,
    //             }
    //         );

    //     } catch (error) {
    //         if (error.response && error.response.status === 400) {
    //             if (error.response.data.error === "Missing required fields") {
    //                 toast.error("Please Provide All Required Fields. Missing required fields");
    //             } else if (error.response.data.error === "Only one prescription and one lab entry allowed for each appointmentId") {
    //                 toast.error("Only One Prescription And One Lab Entry Allowed For Each Appointment");
    //             }
    //         } else {
    //             console.error(error);
    //             toast.error("An error occurred. Please try again later.");
    //         }
    //     }
    // };

//     const typeOptions = [
//         { value: 'prescription', label: 'Prescription' },
//         { value: 'lab', label: 'Lab' }
//     ];

//     return (
//         <>
//             <Navbar />
//             <section className="register-section flex-center apply-doctor" id="contact">
//                 <div className="register-container flex-center contact">
//                     <h2 className="form-heading">Add Prescription</h2>
//                     <form className="register-form " onSubmit={handleCreatePrescription}>
//                         {patients && patients.length > 0 && (
//                             <Select
//                                 options={patients.map(patient => ({ value: patient.user._id, label: `${patient.user.firstname} ${patient.user.lastname}` }))}
//                                 onChange={handlePatientSelect}
//                                 placeholder="Select Patient"
//                             />
//                         )}
//                         <Select
//                             options={typeOptions}
//                             value={selectedType}
//                             onChange={handleTypeSelect}
//                             placeholder="Select Type"
//                         />
//                         <textarea placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
//                         <button type="submit" className="btn form-btn">Create Prescription</button>
//                     </form>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default AddPrescription;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import fetchData from '../helper/apiCall';
import toast from 'react-hot-toast';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/contact.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AddPrescription = () => {
    const [patients, setPatients] = useState([]);
    const [labs, setLabs] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [selectedLab, setSelectedLab] = useState(null);
    const [data, setData] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetchData(`/user/getuserswithAppointment`);
                setPatients(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchLabs = async () => {
            try {
                const response = await axios.get('/lab/getAllLab');
                setLabs(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPatients();
        fetchLabs();
    }, []);

    const handlePatientSelect = (selectedOption) => {
        setSelectedPatientId(selectedOption.value);
    };

    const handleTypeSelect = (selectedOption) => {
        setSelectedType(selectedOption);
        setSelectedLab(null); // Reset selected lab when type changes
    };

    const handleLabSelect = (selectedOption) => {
        setSelectedLab(selectedOption);
    };

    const handleCreatePrescription = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            let labassistantId = '';
            if (selectedType.value === 'lab' && !selectedLab) {
                toast.error('Please select a lab');
                return;
            }
            if (selectedType.value === 'lab' && selectedLab) {
                labassistantId = selectedLab.value;
            }

            const selectedPatient = patients.find(patient => patient.user._id === selectedPatientId);
            if (!selectedPatient) {
                toast.error('Selected patient not found');
                return;
            }
            console.log('Lab Assistant Id',labassistantId)

            await toast.promise(
                axios.post(
                    "/prescription/writePrescription",
                    {
                        patientId: selectedPatient.user._id,
                        type: selectedType.value,
                        appointmentId: selectedPatient.appointmentId,
                        labassistantId,
                        data
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                ),
                {
                    success: `${selectedType.value} ${selectedType.value ==='prescription'?'Created':'Assigned'} Successfully`,
                    error: `Unable to Create ${selectedType.value}`,
                    loading: `${selectedType.value ==='prescription'?'Creating':'Assigning'} ${selectedType.value}...`,
                }
            );

        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error === "Missing required fields") {
                    toast.error("Please Provide All Required Fields. Missing required fields");
                } else if (error.response.data.error === "Only one prescription and one lab entry allowed for each appointmentId") {
                    toast.error("Only One Prescription And One Lab Entry Allowed For Each Appointment");
                }
            } else {
                console.error(error);
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    const typeOptions = [
        { value: 'prescription', label: 'Prescription' },
        { value: 'lab', label: 'Lab' }
    ];

    return (
        <>
            <Navbar />
            <section className="register-section flex-center apply-doctor" id="contact">
                <div className="register-container flex-center contact">
                    <h2 className="form-heading">Add Prescription</h2>
                    <form className="register-form ">
                        {patients && patients.length > 0 && (
                            <Select
                                options={patients.map(patient => ({ value: patient.user._id, label: `${patient.user.firstname} ${patient.user.lastname}` }))}
                                onChange={handlePatientSelect}
                                placeholder="Select Patient"
                            />
                        )}
                        <Select
                            options={typeOptions}
                            value={selectedType}
                            onChange={handleTypeSelect}
                            placeholder="Select Type"
                        />
                        {selectedType && selectedType.value === 'lab' && labs.length > 0 && (
                            <Select
                                options={labs.map(lab => ({ value: lab.userId, label: lab.labName }))}
                                onChange={handleLabSelect}
                                placeholder="Select Lab"
                            />
                        )}
                        <textarea placeholder="Data" value={data} onChange={(e) => setData(e.target.value)} />
                        <button className="btn form-btn" onClick={handleCreatePrescription}>Create Prescription</button>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AddPrescription;

