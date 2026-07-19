import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(30, "Name cannot exceed 30 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email address")
    .min(3, "Email must be at least 3 characters long"),
  category: yup
    .string()
    .required("Please select a category"),
  message: yup
    .string()
    .trim()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message cannot exceed 1000 characters"),
});
