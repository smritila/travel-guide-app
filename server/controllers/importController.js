const path = require("path");
const fs = require("fs");
const Package = require("../models/PackageDetailsSchema");

const importTourPackages = async (req, res) => {
  const jsonFilePath = path.join(
    __dirname,
    "..",
    "public",
    "tourist_attractions_schema.json"
  ); // Construct the file path

  fs.readFile(jsonFilePath, "utf-8", async (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ message: "Failed to read JSON file" });
    }

    try {
      const jsonData = JSON.parse(data);
      await Package.insertMany(jsonData);
      res.status(200).json({ message: "Data imported successfully!" });
    } catch (error) {
      console.error("Error importing data:", error);
      res.status(500).json({ message: "Failed to import data" });
    }
  });
};

module.exports = { importTourPackages };
