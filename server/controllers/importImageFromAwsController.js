const AWS = require("aws-sdk");
const {
  Package,
  PackageWithImages
} = require("../models/PackageDetailsSchema");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your Secret Access Key
  region: "us-east-1" // Replace with your bucket's region
});

// Initialize S3 client
const s3 = new AWS.S3();
const bucketName = "smriti20-image-storage";

async function listS3Images() {
  const params = {
    Bucket: bucketName
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents.map(
      (item) => `https://${bucketName}.s3.amazonaws.com/${item.Key}`
    );
  } catch (err) {
    console.error("Error fetching S3 objects:", err);
    throw err;
  }
}

async function linkImagesToMongoDB(_, res) {
  // Fetch all image URLs from S3
  const imageUrls = await listS3Images();
  const packages = await Package.find();

  try {
    for (const package of packages) {
      const placeName = package.place_name
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, "-"); // Replace spaces with hyphens

      const imageUrlsForPackage = imageUrls.filter((url) =>
        url.includes(placeName)
      );
      if (imageUrlsForPackage.length === 0) {
        console.log(`No images found for ${placeName}`);
        continue;
      }
      await addPackageImages(package._id, imageUrlsForPackage);
    }
    res
      .status(200)
      .json({ message: "Image linked with packages successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to link image" });
  }

  res.json(imageUrls);
}

async function addPackageImages(packageId, imageUrls) {
  const newRecord = new PackageWithImages({
    package_id: packageId,
    image_urls: imageUrls
  });

  await newRecord.save();
  console.log("Package with images added:", newRecord);
}

module.exports = { linkImagesToMongoDB };
