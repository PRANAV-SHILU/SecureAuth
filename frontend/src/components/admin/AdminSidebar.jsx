import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Mail } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname.includes("/dashboard");
  const isContact = location.pathname.includes("/admin/contact");

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

      {/* Contact Link */}
      <button
        onClick={() => navigate("/admin/contact")}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors font-semibold text-sm ${
          isContact
            ? "bg-(--primary-500) text-white"
            : "text-(--text-secondary) hover:bg-(--surface-hover) hover:text-(--text-primary)"
        }`}
      >
        <Mail size={18} /> Contact
      </button>
    </aside>
  );
}
