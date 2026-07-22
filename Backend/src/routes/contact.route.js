import express from "express";
import {
  upload,
  uploadToCloudinaryMiddleware,
  checkMediaSize,
} from "../middlewares/upload.middleware.js";
import { contactValidation } from "../validators/contact.validator.js";
import { submitContactForm } from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.post(
  "/submit",
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
