import multer from 'multer'
import path from 'path'

// ✅ Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads') // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false)
  }
}

// ✅ Final multer setup
const upload = multer({ storage, fileFilter })  //where to store in localstorage and what allow to store
export default upload
