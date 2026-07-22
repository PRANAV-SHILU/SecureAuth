import { validationResult } from "express-validator";
import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }

  try {
    const { name, email, category, message, userId } = req.body;

    // Separate images and video from the uploaded URLs
    const images = [];
    let video = null;

    if (req.cloudinaryUrls && req.cloudinaryUrls.length > 0) {
      req.cloudinaryUrls.forEach((url) => {
        if (url.includes("/video/")) {
          video = url;
        } else {
          images.push(url);
        }
      });
    }

    const contactData = {
      name,
      email,
      category,
      message,
    };

    if (userId && userId !== "null") contactData.userId = userId;
    if (images.length > 0) contactData.images = images;
    if (video) contactData.video = video;

    const newContact = new Contact(contactData);

    await newContact.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Your message has been sent successfully!",
      });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
