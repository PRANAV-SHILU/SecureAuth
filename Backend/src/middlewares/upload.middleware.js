import multer from "multer";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Unsupported file type! Only images and videos are allowed."),
        false,
      );
    }
  },
});

export const checkMediaSize = (req, res, next) => {
  const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : (req.file ? [req.file] : []);
  if (files.length === 0) return next();

  for (const file of files) {
    const { size, mimetype } = file;
    const isImage = mimetype.startsWith("image/");
    const isVideo = mimetype.startsWith("video/");

    if (isImage && size > 10 * 1024 * 1024) {
      return res.status(400).json({ message: "Image file size cannot exceed 10 MB" });
    }

    if (isVideo && size > 100 * 1024 * 1024) {
      return res.status(400).json({ message: "Video file size cannot exceed 100 MB" });
    }
  }

  next();
};

export const uploadToCloudinaryMiddleware = (folder = "uploads") => {
  return async (req, res, next) => {
    const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) : (req.file ? [req.file] : []);
    if (files.length === 0) return next();

    try {
      const uploadPromises = files.map((file, index) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const customName = req.user
          ? `${req.user.username}_${req.user.userId}_${Date.now()}_${index}`
          : `${Date.now()}_${index}_${file.originalname}`;

        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");
        
        let finalFolder = folder;
      // Only add subfolders if folder is "uploads" (for posts)
      // For specific folders like "uploads/profile-image", keep as-is
        if (folder === "uploads") {
          if (isImage) {
            finalFolder = `${folder}/images`;
          } else if (isVideo) {
            finalFolder = `${folder}/videos`;
          }
        }

        return uploadToCloudinary(dataURI, finalFolder, customName);
      });

      const uploadResults = await Promise.all(uploadPromises);
      
      req.cloudinaryUrls = uploadResults.map(result => result.secure_url);
      
      // Preserve backward compatibility for single-file routes
      if (req.cloudinaryUrls.length > 0) {
        req.cloudinaryUrl = req.cloudinaryUrls[0];
      }

      next();
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({ message: "Failed to upload file to Cloudinary" });
    }
  };
};

export default upload;
