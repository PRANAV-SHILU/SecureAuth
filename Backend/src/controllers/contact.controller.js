import { validationResult } from "express-validator";
import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }

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

  res.status(200).json({
    success: true,
    message: "Your message has been sent successfully!",
  });
};

export const getAdminContactData = async (req, res, next) => {
  try {
    const isResponded = req.query.isResponded;

    const query =
      isResponded === "true" || isResponded === true
        ? { response: { $ne: "" } }
        : { response: { $eq: "" } };

    const contactData = await Contact.find(query)
      .populate("userId", "username profileImage email")
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments();
    const responded = await Contact.countDocuments({ response: { $ne: "" } });
    const pending = total - responded;

    return res.status(200).json({
      success: true,
      message: "Contact data fetched successfully!",
      data: {
        contacts: contactData,
        stats: { total, pending, responded }
      },
    });
  } catch (error) {
    console.error("getAdminContactData error:", error.message);
    next(error);
  }
};

