const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const Prescription = require("../models/prescriptionModel");

const getallappointments = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");
    return res.send(appointments);
  } catch (error) {
    res.status(500).send("Unable to get apponintments");
  }
};

const bookappointment = async (req, res) => {
  try {
    const appointment = await Appointment({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.locals,
      transactionPic: req.body.pic
    });

    const usernotification = Notification({
      userId: req.locals,
      content: `You booked an appointment with Dr. ${req.body.doctorname} for ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save();

    const user = await User.findById(req.locals);

    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
    });

    await doctornotification.save();

    const result = await appointment.save();
    return res.status(201).send(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Unable to book appointment");
  }
};

// const completed = async (req, res) => {
//   try {
//     const alreadyFound = await Appointment.findOneAndUpdate(
//       { _id: req.body.appointid },
//       { status: "Completed" }
//     );

//     const usernotification = Notification({
//       userId: req.locals,
//       content: `Your appointment with ${req.body.doctorname} has been completed`,
//     });

//     await usernotification.save();

//     const user = await User.findById(req.locals);

//     const doctornotification = Notification({
//       userId: req.body.doctorId,
//       content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
//     });

//     await doctornotification.save();

//     return res.status(201).send("Appointment completed");
//   } catch (error) {
//     res.status(500).send("Unable to complete appointment");
//   }
// };

const completed = async (req, res) => {
  try {
    const appointmentId = req.body.appointid;
    const userId = req.locals;

   

    // Check if the user has a prescription for this appointment
    const prescription = await Prescription.findOne({
      doctorId: userId,
      appointmentId: appointmentId,
    });

    if (!prescription) {
      return res.status(400).json({ error:"No prescription found for this appointment"});
    }

     // Check if the appointment has already been completed
     const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, status: { $ne: "Completed" } },
      { status: "Completed" }
    );

    if (!appointment) {
      return res.status(400).json({error:"Appointment has already been completed"});
    }

    const usernotification = Notification({
      userId: userId,
      content: `Your appointment with ${req.body.doctorname} has been completed`,
    });

    await usernotification.save();

    const user = await User.findById(userId);

    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    await doctornotification.save();

    return res.status(201).json({ message:"Appointment completed"});
  } catch (error) {
    res.status(500).json({error:"Unable to complete appointment"});
  }
};



module.exports = {
  getallappointments,
  bookappointment,
  completed,
};
