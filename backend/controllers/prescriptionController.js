const prescriptionModel=require('../models/prescriptionModel');
const jwt=require('jsonwebtoken');
const { format } = require('date-fns-tz');
const timeZone = 'GB';
const User = require('../models/userModel');

exports.getPrescription = (req, res) => {
   const patientId= req.locals; 
    // Query prescription prescriptionModel from the database using Mongoose
    prescriptionModel.find({ patientId })
        .then(patientprescriptionModel => {
            res.json(patientprescriptionModel);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.AllPrescription = (req, res) => {
    // Query all prescriptions from the database using Mongoose
    prescriptionModel.find()
      .then(allPrescriptions => {
        res.json(allPrescriptions);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  };
  

// Endpoint to create a new prescription entry
exports.prescription = async (req, res) => {
    const { patientId, type, data,appointmentId,labassistantId } = req.body;

    // Extract the doctorId from the decoded token stored in req.user
    const doctorId = req.locals;

    if (!patientId || !doctorId || !type || !data || !appointmentId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Check if a prescription or lab with the same appointmentId already exists
        const existingPrescription = await prescriptionModel.findOne({ appointmentId, type: "prescription" });
        const existingLab = await prescriptionModel.findOne({ appointmentId, type: "lab" });

        if ((type === "prescription" && existingPrescription) || (type === "lab" && existingLab)) {
            return res.status(400).json({ error: "Only one prescription and one lab entry allowed for each appointmentId" });
        }
    // Create a prescriptionModel entry
    const entry = new prescriptionModel({
        patientId,
        doctorId,
        appointmentId,
        labassistantId,
        type,
        data,
        timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone}) // Pakistani date
    });

    // Save the prescriptionModel entry to the database
    entry.save()
    res.status(201).json({ message: "Prescription entry created successfully" });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};
// Endpoint to delete prescription entries for a patient
exports.deletePrescription =  async (req, res) => {
    const { _id, type } = req.body; 

    try {
        const prescription = await prescriptionModel.findOne({ _id, type });
        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        await prescription.deleteOne();
        res.json({ message: "Prescription deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};




// Endpoint to save lab report and add it to prescriptionModel
// exports.labReports= (req, res) => {
//     const { patientId, report } = req.body;
//     const labId = req.locals;
//     if (!patientId || !labId || !report) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     const labReport = {
//         type: "lab",
//         patientId,
//         labId,
//         data: report,
//         timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone}) // Pakistani date
//     };

//     // Save lab report to prescriptionModel
//     prescriptionModel.push(labReport);

//     // Optionally, you can add additional logic here to send the report to the doctor's system as well

//     res.status(201).json({ message: "Lab report saved successfully and added to prescriptionModel" });
// };


// exports.labReports = async (req, res) => {
//     const { patientId, report,appointmentId,labassistantId } = req.body;
//     const doctorId = req.locals;
//     if (!patientId || !doctorId || !report) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     const labReport = {
//         type: "lab",
//         patientId,
//         doctorId,
//         appointmentId,
//         labassistantId,
//         data: report,
//         timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone})
//     };

//     try {
//         await prescriptionModel.create(labReport);
//         // Optionally, you can add additional logic here to send the report to the doctor's system as well
//         res.status(201).json({ message: "Lab report saved successfully and added to prescriptionModel" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

exports.labReports = async (req, res) => {
    const { patientId, report, appointmentId, labassistantId } = req.body;
    const doctorId = req.locals;
    if (!patientId || !doctorId || !report) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Check if a lab report already exists for the given appointmentId and labassistantId
        const existingLabReport = await prescriptionModel.findOne({ type: "lab", appointmentId, labassistantId });
        if (existingLabReport) {
            return res.status(409).json({ error: "Lab report already exists for this appointment and lab assistant" });
        }

        const labReport = {
            type: "lab",
            patientId,
            doctorId,
            appointmentId,
            labassistantId,
            report,
            timestamp: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", { timeZone})
        };

        await prescriptionModel.create(labReport);
        // Optionally, you can add additional logic here to send the report to the doctor's system as well
        res.status(201).json({ message: "Lab report saved successfully and added to prescriptionModel" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllPrescriptionsByDoctor = (req, res) => {
    const doctorId = req.locals;

    // Query prescriptionModel from the database using Mongoose where the doctorId matches
    prescriptionModel.find({ doctorId })
        .then(doctorPrescriptions => {
            res.json(doctorPrescriptions);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.getAllPrescriptionsByLab = (req, res) => {
    const labassistantId = req.locals;

    // Query prescriptionModel from the database using Mongoose where the doctorId matches
    prescriptionModel.find({ labassistantId })
        .then(labPrescriptions => {
            res.json(labPrescriptions);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.getLab = async (req, res) => {
    const userId = req.locals; 
    try {
        const prescriptions = await prescriptionModel.find({ type: 'lab', labassistantId: userId, report: ''});
        const labReports = [];
        for (const prescription of prescriptions) {
            const user = await User.findById(prescription.patientId).select("-password");
            if (user) {
                const PatientName = `${user.firstname} ${user.lastname}`;
                labReports.push({
                    _id: prescription._id,
                    patientId: prescription.patientId,
                    doctorId: prescription.doctorId,
                    appointmentId:prescription.appointmentId,
                    labassistantId:prescription.labassistantId,
                    type: prescription.type,
                    data: prescription.data,
                    timestamp: prescription.timestamp,
                    PatientName: PatientName
                });
            }
        }
        res.json(labReports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
