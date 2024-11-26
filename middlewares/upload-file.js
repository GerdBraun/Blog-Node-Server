import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/posts",
  filename: (req, file, cb) => {
    const {
      params: { id },
    } = req;
    // console.log("file", file);
    // console.log("req.body", req.body);
    cb(
      null,
      //`${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
      `${id}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["jpeg", "jpg", "png", "gif"];

  if (allowedTypes.includes(file.mimetype.split("/")[1])) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});
