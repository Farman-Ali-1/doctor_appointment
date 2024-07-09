const express = require("express");
const auth = require("../middleware/auth");
const labController=require('./../controllers/labController')
const labRouter = express.Router();

labRouter.get('/getLab',auth,labController.getLab);
labRouter.get('/getAllLab',labController.getAllLab);
labRouter.post('/registerLab',auth,labController.registerLab);
labRouter.delete('/deleteLab',auth,labController.deleteLab);
module.exports = labRouter;
 