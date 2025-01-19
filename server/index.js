require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); //cross-origin-resource-sharing

const connect = () => {
  try {
    const mongodbServerURL =
      "mongodb+srv://smrtghoshal24:IbKbwQnchdCxJOTf@cluster-mum.xrjs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-MUM";
    mongoose.connect(`${mongodbServerURL}/BookYourGuide`);
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

// import routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/packages", require("./routes/packageRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes.js"));
app.use("/api/guides", require("./routes/guideRoutes.js"));
app.use("/api/import-data", require("./routes/importRoutes"));

const PORT = 8000;
app.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
  connect();
});
