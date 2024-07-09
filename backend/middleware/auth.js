const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Authorization header missing");
    }
    
    const token = authHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    req.locals = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkDoctorPermission = (req, res, next) => {
  const userId = req.user.userId;

  // Assuming UserModel is your Mongoose model for users
  UserModel.findById(userId)
      .then(user => {
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }

          if (user.isDoctor) {
              // If user is a doctor, allow access to the next middleware or route handler
              next();
          } else {
              // If user is not a doctor, deny access
              return res.status(403).json({ error: "Access forbidden. User is not a doctor." });
          }
      })
      .catch(err => {
          return res.status(500).json({ error: err.message });
      });
};


exports.allowOnlyLabAssistants = (req, res, next) => {
  const userId = req.user.userId; // Assuming the user ID is stored in req.user.userId

  // Assuming UserModel is your Mongoose model for users
  UserModel.findById(userId)
      .then(user => {
          if (!user) {
              return res.status(404).json({ error: "User not found" });
          }

          if (user.isLabAssistant) {
              // If user is a lab assistant, allow access to the next middleware or route handler
              next();
          } else {
              // If user is not a lab assistant, deny access
              return res.status(403).json({ error: "Access forbidden. User is not a lab assistant." });
          }
      })
      .catch(err => {
          return res.status(500).json({ error: err.message });
      });
};


module.exports = auth;
