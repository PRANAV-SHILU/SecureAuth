import express from "express";
import {
  upload,
  uploadToCloudinaryMiddleware,
  checkMediaSize,
} from "../middlewares/upload.middleware.js";
import { contactValidation } from "../validators/contact.validator.js";
import {
  submitContactForm,
  getAdminContactData,
  respondToContact,
} from "../controllers/contact.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const contactRouter = express.Router();

contactRouter.get("/", verifyToken, isAdmin, getAdminContactData);

contactRouter.patch("/:id/respond", verifyToken, isAdmin, respondToContact);

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
