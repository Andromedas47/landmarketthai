import ListingGridSkeleton from "@/components/listings/ListingGridSkeleton";

export default function LandLoading() {
  return (
    <div>
      <div className="bg-slate-900 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-1 h-8 w-72 max-w-full animate-pulse rounded bg-slate-700" />
          <div className="h-4 w-48 animate-pulse rounded bg-slate-700/80" />
        </div>
      </div>

      <div className="container-xl section">
        <ListingGridSkeleton />
      </div>
    </div>
  );
}
