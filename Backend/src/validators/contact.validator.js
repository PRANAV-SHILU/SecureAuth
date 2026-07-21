import { check } from "express-validator";

export const contactValidation = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must be between 3 and 30 characters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .isLength({ min: 3 })
    .withMessage("Email must be at least 3 characters long"),
  check("category")
    .trim()
    .notEmpty()
    .withMessage("Please select a category")
    .isIn(["general", "feedback", "suggestion", "issue", "security", "inquiry"])
    .withMessage("Invalid category selected"),
  check("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
];
