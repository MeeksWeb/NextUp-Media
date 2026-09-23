import { useEffect, useState } from "react";
import { FiBookmark } from "react-icons/fi";
import { Link } from "react-router";
const MovieCard = ({
  item,
  type,
  addMedia,
  saves,
  unCheck,
  added,
  setAdded,
}) => {
  const [message, setMessage] = useState("");

  const title = item.title ?? item.name ?? "Untitled Media";
  const date = item.release_date ?? item.first_air_date;
  const year = date?.split("-")[0];

  const isSaved = saves.some((saved) => saved.id === item.id); // returns true or false

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      unCheck(item.id);
      setMessage("");
    } else {
      addMedia(item);
      setAdded(true);
      setMessage("Added");
    }
  };

  useEffect(() => {
    if (!message) return;

    //clear message
    const toClear = setTimeout(() => {
      setMessage("");
    }, 1500);

    return () => clearTimeout(toClear);
  }, [message]);

  return (
    <Link to={`/details/${type}/${item.id}`}>
      <div className="relative group overflow-hidden rounded-lg bg-slate-900 pb-1 shadow-md transition-transform duration-300 hover:scale-102">
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={title}
            className="aspect-2/3 w-full object-cover"
          />
        ) : (
          <div className="flex aspect-2/3 w-full items-center justify-center bg-slate-700 text-xs text-gray-400">
            No Image
          </div>
        )}
        <button
          onClick={handleClick}
          className="flex gap-1 absolute sm:opacity-0 sm:group-hover:opacity-100 items-center top-2 right-2 rounded  px-2 py-1 text-xs font-semibold text-white transition-opacity duration-300"
        >
          <FiBookmark
            className={`h-5 w-5 transition-colors ${
              isSaved ? "fill-blue-500 text-blue-500" : "text-white-900"
            }`}
          />
        </button>

        <div className="p-2">
          <h3 className="truncate font-semibold text-white">{title}</h3>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span className="text-sm">{year}</span>
            <span className="text-amber-400">
              ★ {item.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
        {added && (
          <p className="absolute w-fit -translate-x-1/2 top-2 left-1/2 z-10 text-sm pr-2 pl-2 pt-1 pb-1  text-green-500 text-center transition-all ">
            {message}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
