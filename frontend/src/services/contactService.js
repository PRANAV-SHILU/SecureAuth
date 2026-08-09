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
  getMyContacts: async (isResponded) => {
    try {
      const response = await contactApi.getMyContacts(isResponded);
      return response.data;
    } catch (error) {
      console.error("Error in contactService.getMyContacts:", error);
      throw error;
    }
  },
  respondToContact: async (id, responseText) => {
    try {
      const response = await contactApi.respondToContact(id, responseText);
      return response.data;
    } catch (error) {
      console.error("Error in contactService.respondToContact:", error);
      throw error;
    }
  },
};
