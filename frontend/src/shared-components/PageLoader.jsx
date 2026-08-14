import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <>
      <div className="top-loading-bar" />
      <div className="flex flex-col items-center justify-center gap-3 py-32">
        <Loader2
          size={56}
          className="animate-spin"
          style={{ color: "var(--primary-500)" }}
        />
        <p
          className="text-lg font-medium tracking-wide animate-pulse"
          style={{ color: "var(--text-muted)" }}
        >
          Loading…
        </p>
      </div>
    </>
  );
}
