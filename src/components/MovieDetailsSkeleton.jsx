// src/components/MovieDetailsSkeleton.jsx
export default function MovieDetailsSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-slate-950 p-6 text-white mt-6 w-[calc(100%-2rem)] max-w-7xl mx-auto md:max-w-none rounded-xl ">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="aspect-2/3 w-full max-w-sm rounded-2xl bg-slate-800 md:w-1/3" />

        <div className="flex flex-1 flex-col justify-center space-y-4">
          <div className="h-10 w-3/4 rounded-md bg-slate-800" />

          <div className="flex gap-3">
            <div className="h-6 w-16 rounded-full bg-slate-800" />
            <div className="h-6 w-20 rounded-full bg-slate-800" />
            <div className="h-6 w-24 rounded-full bg-slate-800" />
          </div>

          <div className="space-y-2 pt-4">
            <div className="h-4 w-full rounded bg-slate-800" />
            <div className="h-4 w-5/6 rounded bg-slate-800" />
            <div className="h-4 w-2/3 rounded bg-slate-800" />
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <div className="h-8 w-40 rounded bg-slate-800" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className="h-24 w-24 rounded-full bg-slate-800" />
              <div className="h-4 w-16 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
