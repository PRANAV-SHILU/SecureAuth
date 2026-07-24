import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LayoutDashboard, Mail, ChevronRight } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isDashboard = location.pathname.includes("/dashboard");
  const isContact = location.pathname.includes("/admin/contact");
  const isResponded = searchParams.get("isResponded");
  
  const [isContactOpen, setIsContactOpen] = useState(isContact);

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2 bg-(--surface-card) border border-(--border-normal) rounded-2xl p-4 h-fit">
      <h2 className="text-xs font-bold uppercase tracking-wider text-(--text-muted) mb-2 px-2">
        Admin Panel
      </h2>

      {/* Dashboard Link */}
      <button
        onClick={() => navigate("/dashboard")}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors font-semibold text-sm ${
          isDashboard
            ? "bg-(--primary-500) text-white"
            : "text-(--text-secondary) hover:bg-(--surface-hover) hover:text-(--text-primary)"
        }`}
      >
        <LayoutDashboard size={18} /> Dashboard
      </button>

      {/* Contact Dropdown */}
      <div className="flex flex-col mt-1">
        <button
          onClick={() => setIsContactOpen(!isContactOpen)}
          className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors font-semibold text-sm ${
            isContact
              ? "text-(--primary-500) bg-(--primary-500)/10"
              : "text-(--text-secondary) hover:bg-(--surface-hover) hover:text-(--text-primary)"
          }`}
        >
          <div className="flex items-center gap-3">
            <Mail size={18} /> Contact
          </div>
          <ChevronRight
            size={16}
            className={`transition-transform duration-200 ${isContactOpen ? "rotate-90" : ""}`}
          />
        </button>
        
        {/* Sub Items */}
        {isContactOpen && (
          <div className="flex flex-col gap-1 pl-10 pr-2 mt-1">
            <button
              onClick={() => navigate("/admin/contact?isResponded=false")}
              className={`text-left text-sm py-1.5 transition-colors ${
                isContact && isResponded === "false"
                  ? "text-(--primary-500) font-semibold"
                  : "text-(--text-muted) hover:text-(--text-primary)"
              }`}
            >
              Not Responded
            </button>
            <button
              onClick={() => navigate("/admin/contact?isResponded=true")}
              className={`text-left text-sm py-1.5 transition-colors ${
                isContact && isResponded === "true"
                  ? "text-(--primary-500) font-semibold"
                  : "text-(--text-muted) hover:text-(--text-primary)"
              }`}
            >
              Responded
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
