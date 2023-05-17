const uuid = require("uuid").v4;
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] !== "image") {
    cb(new Error("Invalid image"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000_000,
    files: 2,
  },
});

module.exports = upload;
