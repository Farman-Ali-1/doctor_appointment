const Lab = require('../models/labModel');
const User = require('../models/userModel');

exports.registerLab = async (req, res) => {
  const { labName, labDetails } = req.body;
  const userId = req.locals; 

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the user is a doctor
    if (user.isDoctor) {
      return res.status(400).json({ error: "A doctor cannot be a lab assistant." });
    }

    // Check if the user is already a lab assistant
    if (user.isLabAssistant) {
      return res.status(400).json({ error: "One lab assistant can have only one lab." });
    }

    // Check if the lab name already exists
    const existingLab = await Lab.findOne({ labName });
    if (existingLab) {
      return res.status(400).json({ error: "Lab name already exists." });
    }

    // Create the lab
    const lab = await Lab.create({ userId, labName, labDetails });

    // Update user's isLabAssistant field to true
    await User.findByIdAndUpdate(userId, { isLabAssistant: true });

    res.status(201).json({ message: "Lab registered successfully", lab });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get lab details by labId
exports.getLab =  async(req, res) => {
  const userId = req.locals;
    Lab.find({ userId })
    .then(lab => {
        res.json(lab);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
};


exports.getAllLab = async (req, res) => {
  try {
    const labs = await Lab.find();
    res.status(200).json(labs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to get all lab information" });
  }
};

// Delete lab by labId
exports.deleteLab = async (req, res) => {
  const labId = req.locals;

  try {
    const lab = await Lab.findByIdAndDelete(labId);
    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }
    res.json({ message: "Lab deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};