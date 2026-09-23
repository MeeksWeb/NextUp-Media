import { Link } from "react-router";

const TopDisplay = ({ movie }) => {
  const currentMovie = movie ?? {};

  return (
    <Link>
      <div className="mx-auto mt-4 h-110 sm:h-80 md:h-100 lg:h-120 md:w-[calc(100%-2rem)] w-full max-w-7xl rounded-2xl bg-slate-900 p-1 shadow-lg  md:max-w-none relative overflow-clip  ">
        <img
          src={
            currentMovie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
              : "No Image"
          }
          alt={currentMovie.name ?? currentMovie.title ?? "No Title"}
          className="h-full w-full rounded-xl object-cover object-top"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-4">
          <h2 className="text-3xl font-bold text-white">
            {currentMovie.name ?? currentMovie.title ?? "No Title"}
          </h2>
          <p className="text-gray-300">
            {currentMovie.overview ?? "No overview available."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TopDisplay;
