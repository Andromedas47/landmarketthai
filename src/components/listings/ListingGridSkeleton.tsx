export default function ListingGridSkeleton() {
  return (
    <div aria-busy="true" aria-label="กำลังโหลดรายการที่ดิน">
      <div className="mb-8 flex flex-wrap gap-3 border-b border-slate-100 pb-6">
        <div className="h-12 w-36 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-12 w-44 animate-pulse rounded-xl bg-slate-200" />
      </div>

      <div className="mb-4 h-4 w-16 animate-pulse rounded bg-slate-200" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="card-ref flex flex-col overflow-hidden"
          >
            <div className="h-44 animate-pulse bg-slate-200 sm:h-48" />
            <div className="flex flex-1 flex-col gap-3 p-4 pb-5">
              <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
              <div className="space-y-2 border-y border-slate-100 py-3">
                <div className="h-3 w-2/5 animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-slate-100" />
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="h-8 w-24 animate-pulse rounded bg-slate-100" />
                <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
