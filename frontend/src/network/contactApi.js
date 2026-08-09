import apiClient from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export const contactApi = {
  submitContactForm: (formData) => {
    return apiClient.post(ENDPOINTS.CONTACT.SUBMIT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getContactData: (isResponded) => {
    return apiClient.get(ENDPOINTS.CONTACT.GET_CONTACTS(isResponded));
  },
  getMyContacts: (isResponded) => {
    return apiClient.get(ENDPOINTS.CONTACT.MY_CONTACTS(isResponded));
  },
  respondToContact: (id, response) => {
    return apiClient.patch(ENDPOINTS.CONTACT.RESPOND(id), { response });
  },
};
