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
    name: user?.username || "",
    email: user?.email || "",
    category: "general",
    message: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  return (
    <ContactFormContext.Provider
      value={{
        formData, setFormData,
        imageFiles, setImageFiles,
        videoFile, setVideoFile,
        imagePreviews, setImagePreviews,
        videoPreview, setVideoPreview
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}
