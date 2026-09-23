import { FaTrash } from "react-icons/fa";
import { Link } from "react-router";

const SavesCard = ({ save, deleteItem, type }) => {
  const title = save.title ?? save.name ?? "Untitled Media";
  const releaseDate = save?.release_date ?? save?.first_air_date;
  const calDate = releaseDate?.split("-")[0] ?? "N/A";

  return (
    <div className="flex flex-row gap-5 rounded-xl border  bg-slate-950 p-3 sm:flex-row md:max-w-none max-w-7xl mx-auto w-full ">
      <div className="relative aspect-2/3 w-36 shrink-0 overflow-hidden rounded-lg bg-slate-950 sm:w-36">
        {save?.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${save?.poster_path}`}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex aspect-2/3 w-full items-center justify-center bg-slate-700 text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div>
            <div className="flex flex-wrap justify-between">
              <h3 className="text-xl font-bold text-white">{title}</h3>

              <button onClick={() => deleteItem(save.id)}>
                <FaTrash className="h-4 w-4 text-red-500 " />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <span>{calDate}</span>
              <span>•</span>

              <div className="flex items-center gap-1 font-semibold text-amber-400">
                <span className="flex items-center gap-1 ">
                  {save.vote_average ? (
                    `★ ${save.vote_average.toFixed(1)}`
                  ) : (
                    <p>N/A</p>
                  )}
                </span>
              </div>
            </div>

            <p className="mt-5 md:mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">
              {save.overview}
            </p>
          </div>
        </div>

        <Link to={`/details/${type}/${save.id}`}>
          <button className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-all md:w-40  ">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SavesCard;
