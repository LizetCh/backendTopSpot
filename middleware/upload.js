const multer = require('multer');
const path = require('path');

// configuración de multer paea subir imágenes

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'profilePic') {
      cb(null, '../public/uploads/profile-pics/');
    } else if (file.fieldname === 'coverImage') {
      cb(null, '../public/uploads/cover-images/');
    }
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
