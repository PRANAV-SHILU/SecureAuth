import express from "express";
import {
  upload,
  uploadToCloudinaryMiddleware,
  checkMediaSize,
} from "../middlewares/upload.middleware.js";
import { contactValidation } from "../validators/contact.validator.js";
import {
  submitContactForm,
  getContactData,
} from "../controllers/contact.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const contactRouter = express.Router();

contactRouter.get("/", verifyToken, getContactData);

contactRouter.post(
  "/submit",
  verifyToken,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  checkMediaSize,
  uploadToCloudinaryMiddleware("uploads/contact"),
  contactValidation,
  submitContactForm,
);

export default contactRouter;
