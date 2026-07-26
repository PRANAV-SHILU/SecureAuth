import { useSearchParams, useNavigate } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import AdminSidebar from "../components/admin/AdminSidebar";
import { Mail, CheckCheck, Clock } from "lucide-react";

const TABS = [
  {
    key: "false",
    label: "Pending",
    icon: <Clock size={15} />,
  },
  {
    key: "true",
    label: "Responded",
    icon: <CheckCheck size={15} />,
  },
];

export default function AdminContact() {
  useDocumentMetadata("Admin Contact");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isResponded = searchParams.get("isResponded") ?? "false";

  const isPending = isResponded === "false";

  return (
    <div className="pb-12 md:pb-16 flex flex-col md:flex-row gap-6 mt-6 w-full">
      <AdminSidebar />

      <main className="flex-1 min-w-0 bg-(--surface-card) border border-(--border-normal) rounded-2xl p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="my-6">
          <h1
            className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight flex items-center gap-3"
            style={{ color: "var(--text-primary)" }}
          >
            <Mail style={{ color: "var(--primary-500)" }} size={32} />
            Contact Submissions
          </h1>
          <p className="text-base" style={{ color: "var(--text-muted)" }}>
            {isPending
              ? "These messages haven't been responded to yet. Reply to keep your community heard."
              : "All caught up! These messages have already received a response."}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="tab-container flex w-fit p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-[10px] sm:mb-8 4xl:p-2.5 4xl:gap-4 4xl:mt-12 4xl:mb-12">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn py-1 px-3 text-sm sm:py-[0.22rem] sm:px-6 sm:text-[1.2rem] 4xl:py-3.5 4xl:px-10 4xl:text-2xl ${
                  isResponded === tab.key ? "active" : ""
                }`}
                onClick={() =>
                  navigate(`/admin/contact?isResponded=${tab.key}`)
                }
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <span className="hidden xsm:inline-flex">{tab.icon}</span>{" "}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Placeholder — contact list goes here */}
        <div
          className="flex items-center justify-center h-48 rounded-2xl border border-dashed text-lg font-semibold"
          style={{
            borderColor: "var(--border-normal)",
            color: "var(--text-muted)",
          }}
        >
          {isPending ? "📬 Pending submissions will appear here" : "✅ Responded submissions will appear here"}
        </div>
      </main>
    </div>
  );
}
