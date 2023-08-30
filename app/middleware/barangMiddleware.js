import multer from "multer";
import path from "path";
// Konfigurasi Multer untuk upload foto
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
}).single("foto");

export default upload;
