import { useRouteLoaderData, useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Lock,
  ChevronRight,
} from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";
import BackButton from "../shared-components/BackButton";

const SETTINGS_SECTIONS = [
  {
    key: "account",
    label: "Account",
    description: "Manage your profile, username, and email",
    icon: User,
    color: "var(--primary-500)",
    bg: "var(--primary-50)",
  },
  {
    key: "privacy",
    label: "Privacy & Security",
    description: "Control who can see your content and data",
    icon: Shield,
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
  {
    key: "notifications",
    label: "Notifications",
    description: "Choose what updates you want to receive",
    icon: Bell,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
  {
    key: "appearance",
    label: "Appearance",
    description: "Customize theme, layout, and display",
    icon: Palette,
    color: "#ec4899",
    bg: "#fdf2f8",
  },
  {
    key: "password",
    label: "Change Password",
    description: "Update your password and security settings",
    icon: Lock,
    color: "#10b981",
    bg: "#ecfdf5",
  },
];

export default function Settings() {
  useDocumentMetadata("Settings");
  const user = useRouteLoaderData("root");
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl px-3 xsm:px-4 md:px-8 pt-8 pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-8">
          <BackButton />
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
            Settings
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
            <SettingsIcon size={24} />
          </div>
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Settings
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage your account preferences, privacy, and personalization.
          </p>
        </div>


        {/* Settings Sections */}
        <div className="flex flex-col gap-3">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.key}
                disabled
                className="w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 opacity-60 cursor-not-allowed"
                style={{
                  backgroundColor: "var(--surface-card)",
                  borderColor: "var(--border-normal)",
                }}
              >
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: section.bg,
                    color: section.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm sm:text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.label}
                  </p>
                  <p
                    className="text-xs sm:text-sm mt-0.5 truncate"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {section.description}
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="shrink-0"
                  style={{ color: "var(--text-disabled)" }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
