import { useState } from "react";
import MovieCard from "./MovieCard";
import Select from "./Select";
import SwitchButton from "./SwitchButton";

const TrendingSection = ({
  movies,
  loading,
  error,
  type,
  setType,
  description,
  setDescription,
  page,
  totalPages,
  loadNext,
  loadPrevious,
  saves,
  setSaves,
  addMedia,
  unCheck,
  added,
  setAdded,
}) => {
  const [filter, setFilter] = useState("");

  const setMovies = () => {
    setType("movie");
  };

  const setShows = () => {
    setType("tv");
  };

  const filteredItem =
    type === "movie"
      ? movies.filter((movie) =>
          movie.title?.toLowerCase().includes(filter.toLowerCase()),
        )
      : movies.filter((show) =>
          show.name?.toLowerCase().includes(filter.toLowerCase()),
        );

  return (
    <div className="mx-auto mt-16 flex md:w-[calc(100%-2rem)] w-full max-w-7xl flex-col gap-4 md:max-w-none ">
      <div className="mt-2 w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="mt-2 flex gap-4">
            <SwitchButton
              movieActive={type === "movie"}
              setMovies={setMovies}
              name="Movies"
            />
            <SwitchButton
              movieActive={type === "tv"}
              setMovies={setShows}
              name="Shows"
            />
          </div>
          <Select
            description={description}
            setDescription={setDescription}
            type={type}
          />
        </div>
        {movies.length > 0 ? (
          <div>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="filter by title..."
              className=" bg-gray-200 text-gray-800 p-2 rounded-lg w-full mt-3 sm:mt-6 sm:w-120"
            />
          </div>
        ) : null}
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-4">
            {filteredItem.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                type={type}
                saves={saves}
                setSaves={setSaves}
                addMedia={addMedia}
                unCheck={unCheck}
                added={added}
                setAdded={setAdded}
              />
            ))}
          </div>
        }
        {filter && filteredItem.length === 0 && (
          <p className="mt-30 mb-30 text-center">Search not found</p>
        )}
      </div>
      {movies.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-4 border-t border-slate-800 pt-6">
          <button
            onClick={loadPrevious}
            disabled={page === 1 || loading}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            &larr; Previous
          </button>

          <span className="text-sm font-medium text-slate-400">
            Page <strong className="text-gray-800">{page}</strong> of{" "}
            <strong className="text-gray-400">{totalPages}</strong>
          </span>

          <button
            onClick={loadNext}
            disabled={page >= totalPages || loading}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendingSection;
