const multer = require('multer');
const path = require('path');
const fs = require("fs");

const uploadDir = path.join(__dirname, "../public/uploads/profile-pics");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// configuración de multer paea subir imágenes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    if (file.fieldname === 'profilePic') {
      folder = path.join(__dirname, '../public/uploads/profile-pics/');
    } else if (file.fieldname === 'coverImage') {
      folder = path.join(__dirname, '../public/uploads/cover-images/');
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

//tipo de archivo
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp)'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
