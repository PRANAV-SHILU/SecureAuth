import { Suspense } from "react";
import { useLoaderData, Await, Link, useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, MessageSquareText, Mail, Clock, CheckCheck } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";
import ContactCard from "../components/admin/ContactCard";

const TABS = [
  { key: "false", label: "Pending",   icon: <Clock size={15} /> },
  { key: "true",  label: "Responded", icon: <CheckCheck size={15} /> },
];

function InquiryList({ contacts, isAdmin }) {
  if (!contacts?.length) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed gap-4"
        style={{ borderColor: "var(--border-normal)", color: "var(--text-muted)", backgroundColor: "var(--surface-input)" }}
      >
        <Mail size={48} strokeWidth={1.2} style={{ color: "var(--primary-400)" }} />
        <div className="text-center">
          <p className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>No inquiries yet</p>
          <p className="text-sm">Need help or want to share feedback? We'd love to hear from you.</p>
        </div>
        <Link 
          to="/contact-us"
          className="mt-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95 no-underline"
          style={{ backgroundColor: "var(--primary-500)", color: "#fff" }}
        >
          Contact Support
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {contacts.map((c) => (
        <ContactCard key={c._id} contact={c} isAdmin={isAdmin} />
      ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-5 border h-40 animate-pulse"
          style={{ backgroundColor: "var(--surface-input)", borderColor: "var(--border-normal)" }}
        />
      ))}
    </div>
  );
}

export default function MyInquiries() {
  useDocumentMetadata("My Inquiries");
  const { contactData, isAdmin } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isResponded = searchParams.get("isResponded") ?? "false";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl px-3 xsm:px-4 md:px-8 pt-8 pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400">
            Inquiries
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: "var(--primary-50)",
              color: "var(--primary-600)",
            }}
          >
            <MessageSquareText size={24} />
          </div>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            My Inquiries
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Track all your contact submissions and view responses from our team.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="tab-container flex w-fit p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-2.5 sm:mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn py-1 px-3 text-sm sm:py-[0.22rem] sm:px-6 sm:text-[1.2rem] ${isResponded === tab.key ? "active" : ""}`}
                onClick={() => navigate(`/my-inquiries?isResponded=${tab.key}`)}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <span className="hidden xsm:inline-flex">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <Suspense fallback={<LoadingSkeleton />}>
          <Await
            resolve={contactData}
            errorElement={
              <p className="text-center py-10" style={{ color: "var(--text-muted)" }}>
                Failed to load your inquiries.
              </p>
            }
          >
            {(data) => <InquiryList contacts={data?.contacts || []} isAdmin={isAdmin} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
