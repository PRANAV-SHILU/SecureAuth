import { useSearchParams } from "react-router-dom";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminContact() {
  useDocumentMetadata("Admin Contact");
  const [searchParams] = useSearchParams();
  const isResponded = searchParams.get("isResponded");

  return (
    <div className="pb-12 md:pb-16 flex flex-col md:flex-row gap-6 mt-6 w-full">
      <AdminSidebar />
      
      <main className="flex-1 min-w-0 bg-(--surface-card) border border-(--border-normal) rounded-2xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center h-64 text-2xl font-bold text-(--text-secondary)">
          Contact
          {isResponded && (
            <span className="ml-2 text-base text-(--text-muted)">
              ({isResponded === "true" ? "Responded" : "Not Responded"})
            </span>
          )}
        </div>
      </main>
    </div>
  );
}
