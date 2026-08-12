export default function MyInquiriesSkeleton() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl lg:max-w-4xl 2xl:max-w-5xl px-3 xsm:px-4 sm:px-6 md:px-8 pt-5 sm:pt-8 pb-12 sm:pb-20">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div className="h-4 sm:h-5 w-14 sm:w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-5 sm:h-6 w-16 sm:w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
        </div>

        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-10 flex flex-col items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-3 sm:mb-4" />
          <div className="h-7 sm:h-9 w-40 sm:w-52 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-1.5 sm:mb-3" />
          <div className="h-3.5 sm:h-4 md:h-5 w-64 sm:w-80 md:w-96 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center">
          <div className="flex w-fit p-1 gap-1.5 mt-2 mb-6 sm:p-[0.35rem] sm:gap-2 sm:mt-2.5 sm:mb-8 bg-zinc-100 dark:bg-zinc-800/50 rounded-full animate-pulse">
            <div className="h-7 w-20 sm:h-9 sm:w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
            <div className="h-7 w-20 sm:h-9 sm:w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Content - Contact Cards */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl p-4 sm:p-5 border h-36 sm:h-40 animate-pulse"
              style={{ backgroundColor: "var(--surface-input)", borderColor: "var(--border-normal)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
