import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center cursor-pointer gap-2 text-sm font-semibold transition-all duration-200 hover:-translate-x-1 bg-transparent border-none"
      style={{ color: "var(--text-secondary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
