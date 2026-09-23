const TopCast = ({ cast }) => {
  return (
    <>
      <div className="overflow-hidden rounded-xl bg-slate-900 p-2 text-center">
        {cast.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
            alt={cast.name}
            className="aspect-square w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-slate-800 text-xs text-slate-500">
            No Photo
          </div>
        )}
        <h3 className="mt-2 truncate text-sm font-semibold text-white">
          {cast.name}
        </h3>
        <p className="truncate text-xs text-slate-400">{cast.character}</p>
      </div>
    </>
  );
};

export default TopCast;
