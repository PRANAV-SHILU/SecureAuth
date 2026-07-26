import { contactApi } from "../network/contactApi";

export const contactService = {
  submitContactForm: async (formData) => {
    try {
      const response = await contactApi.submitContactForm(formData);
      return response.data;
    } catch (error) {
      console.error("Error in contactService.submitContactForm:", error);
      throw error;
    }
  },
  getContactData: async (isResponded) => {
    try {
      const response = await contactApi.getContactData(isResponded);
      return response.data;
    } catch (error) {
      console.error("Error in contactService.getContactData:", error);
      throw error;
    }
  },
};
