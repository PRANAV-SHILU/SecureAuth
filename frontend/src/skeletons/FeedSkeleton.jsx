export default function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-8 feed-grid">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="feed-card-wrapper flex flex-col rounded-2xl overflow-hidden shadow-sm"
          style={{
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--border-normal)",
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Header — matches FeedCard header height */}
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: "var(--border-light)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-zinc-800 animate-pulse" />
              <div className="h-3.5 w-24 bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="hidden sm:block h-3 w-28 bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Media — fixed height to match FeedCard media area */}
          <div
            className="w-full bg-zinc-900 animate-pulse"
            style={{ height: "520px" }}
          />

          {/* Footer — matches FeedCard footer layout */}
          <div className="p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
              <div className="h-6 w-6 bg-zinc-800 rounded-lg animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-4/5 bg-zinc-800 rounded animate-pulse" />
              <div className="h-3.5 w-3/5 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
