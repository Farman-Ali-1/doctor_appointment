const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const db='mongodb+srv://ranasaimali1234:za9RJ8EOxwFCmVQY@healthbooker.uafod9n.mongodb.net/'
const client = mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;
