import { contactService } from "../services/contactService";
import { toast } from "react-toastify";

export async function contactAction({ request }) {
  try {
    const formData = await request.formData();
    
    const logData = Object.fromEntries(formData);
    logData.images = formData.getAll("images");
    // console.log("Contact Form Data:", logData);

    await contactService.submitContactForm(formData);
    toast.success("Your message has been sent successfully!");
    return { success: true };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      "Failed to send message. Please try again.";
    toast.error(message);
    return { error: message };
  }
}
