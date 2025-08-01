import multer from 'multer'

// memory storage for direct buffer
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false)
  }
}

const upload = multer({ storage, fileFilter });

export default upload;
