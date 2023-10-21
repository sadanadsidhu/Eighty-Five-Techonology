const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images"); // Give the folder name not the directory path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: "2097152" }, //max size 2mb
  fileFilter: (req, file, cb) => {
    console.log("fileinmulter", file);
    console.log("grintaaa");
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
}).single("image");
// }).array("image", )4; // Allow up to 4 images
// }).array("image"); // Allow up unlimited images

module.exports = uploadImage;
