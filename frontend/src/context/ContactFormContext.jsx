import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactFormContext = createContext();

const getInitialUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function ContactFormProvider({ children }) {
  const user = getInitialUser();
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    category: "",
    message: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  return (
    <ContactFormContext.Provider
      value={{
        formData, setFormData,
        imageFile, setImageFile,
        videoFile, setVideoFile,
        imagePreview, setImagePreview,
        videoPreview, setVideoPreview
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}
