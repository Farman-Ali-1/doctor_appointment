const express = require("express");
const auth = require("../middleware/auth");
const prescriptionController=require('./../controllers/prescriptionController')
const prescriptionRouter = express.Router();

prescriptionRouter.get("/", auth,prescriptionController.getPrescription );
prescriptionRouter.get("/all", auth,prescriptionController.AllPrescription );
prescriptionRouter.post("/writePrescription",auth,prescriptionController.prescription);
prescriptionRouter.delete('/deletePrescription',auth,prescriptionController.deletePrescription);
prescriptionRouter.post('/labReport',auth,prescriptionController.labReports);
prescriptionRouter.get('/doc-pres', auth,prescriptionController.getAllPrescriptionsByDoctor);
prescriptionRouter.get('/lab-pres', auth,prescriptionController.getAllPrescriptionsByLab);
prescriptionRouter.get("/lab", auth,prescriptionController.getLab );

module.exports = prescriptionRouter;
 