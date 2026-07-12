import { useState, useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router-dom";
import {
  MessageSquare,
  User,
  Mail,
  ChevronDown,
  Send,
  ImagePlus,
  Video,
  X,
  Loader2,
} from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";

const CATEGORY_OPTIONS = [
  { value: "", label: "Select a category *" },
  { value: "support", label: "Support" },
  { value: "improvement", label: "Improvement" },
  { value: "suggestion", label: "Suggestion" },
  { value: "general", label: "General" },
];

export default function ContactUs() {
  useDocumentMetadata("Contact Us");

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // Pre-fill from localStorage
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user.username) setUsername(user.username);
        if (user.email) setEmail(user.email);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Handle video selection
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeVideo = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  // TODO: Implement submit logic
  const handleSubmit = (e) => {
    // Empty — will be connected to the action later
  };

  // Shared input styles
  const inputStyle = {
    backgroundColor: "var(--surface-input)",
    borderColor: "var(--border-normal)",
    color: "var(--text-primary)",
  };

  const focusHandlers = {
    onFocus: (e) => {
      e.target.style.borderColor = "var(--primary-500)";
      e.target.style.boxShadow = "0 0 0 3px rgba(var(--primary-500-rgb), 0.15)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "var(--border-normal)";
      e.target.style.boxShadow = "none";
    },
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl px-2 xsm:px-4 md:px-8 pt-8 pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Contact
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-(--primary-600) mb-4"
            style={{ backgroundColor: "var(--primary-50)" }}
          >
            <MessageSquare size={24} />
          </div>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Contact Us
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Have a question, suggestion, or need support? We'd love to hear from
            you. Fill out the form below and we'll get back to you.
          </p>
        </div>

        {/* Form */}
        <Form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-username"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <User size={14} />
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-username"
              name="username"
              type="text"
              required
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-email"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <Mail size={14} />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-category"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronDown size={14} />
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-category"
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 appearance-none cursor-pointer"
                style={inputStyle}
                {...focusHandlers}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <MessageSquare size={14} />
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 resize-y min-h-[120px]"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>

          {/* Optional Uploads */}
          <div className="flex flex-col gap-3">
            <p
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Attachments{" "}
              <span
                className="normal-case font-medium tracking-normal"
                style={{ color: "var(--text-muted)" }}
              >
                (optional)
              </span>
            </p>

            <div className="grid grid-cols-1 xsm:grid-cols-2 gap-3">
              {/* Image Upload */}
              <div>
                {!imagePreview ? (
                  <label
                    htmlFor="contact-image"
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-(--primary-500) group"
                    style={{ borderColor: "var(--border-normal)" }}
                  >
                    <ImagePlus
                      size={24}
                      className="text-(--text-muted) group-hover:text-(--primary-500) transition-colors"
                    />
                    <span
                      className="text-xs font-semibold group-hover:text-(--primary-500) transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Upload Image
                    </span>
                    <input
                      id="contact-image"
                      ref={imageInputRef}
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-normal)" }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-500 flex items-center justify-center text-white border-none cursor-pointer transition-colors"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                {!videoPreview ? (
                  <label
                    htmlFor="contact-video"
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all hover:border-(--primary-500) group"
                    style={{ borderColor: "var(--border-normal)" }}
                  >
                    <Video
                      size={24}
                      className="text-(--text-muted) group-hover:text-(--primary-500) transition-colors"
                    />
                    <span
                      className="text-xs font-semibold group-hover:text-(--primary-500) transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Upload Video
                    </span>
                    <input
                      id="contact-video"
                      ref={videoInputRef}
                      name="video"
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: "var(--border-normal)" }}>
                    <video
                      src={videoPreview}
                      className="w-full h-32 object-cover"
                      muted
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-500 flex items-center justify-center text-white border-none cursor-pointer transition-colors"
                      aria-label="Remove video"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider text-white border-none cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none mt-2"
            style={{ backgroundColor: "var(--primary-500)" }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </Form>
      </div>
    </div>
  );
}
