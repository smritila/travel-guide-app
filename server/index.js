const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); //cross-origin-resource-sharing
// import routes

const connect = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/BookYourGuide");
    console.log("connected to database");
  } catch (err) {
    console.log(err.message);
  }
};
app.use(cors());
// used to parse json requests
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("server is working..");
});
// call user routes

const PORT = 8000;
app.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
  connect();
});
