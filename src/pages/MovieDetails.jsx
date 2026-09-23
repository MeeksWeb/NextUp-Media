import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TopCast from "../components/TopCast";
import MovieDetailsSkeleton from "/src/components/MovieDetailsSkeleton";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// import { Link } from "react-router-dom";
const MovieDetails = ({ addMedia, unCheck, saves }) => {
  const { id, type } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`,
        );

        if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [id, type]);

  const isSaved = saves.some((saved) => saved.id === movies.id);

  const handleClick = () => {
    if (isSaved) {
      unCheck(movies.id);
    } else {
      addMedia(movies);
    }
  };

  const title = movies.title ?? movies.name ?? "Untitled Media";
  const releaseDate = movies?.release_date ?? movies?.last_air_date;
  const calDate = releaseDate?.split("-")[0] ?? "N/A";

  return (
    <>
      {loading && <MovieDetailsSkeleton />}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="min-h-screen bg-slate-950 text-slate-100 mt-6 w-full md:w-[calc(100%-2rem)] max-w-7xl mx-auto md:max-w-none rounded-xl ">
          <div className="relative h-[50vh] w-full overflow-hidden md:h-[65vh] rounded-t-xl ">
            {movies.backdrop_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
                alt={title}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-slate-900" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto -mt-35 max-w-7xl px-6 pb-16 md:-mt-52 ">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {/* Movie Poster */}
              <div className="w-48 shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 md:w-72">
                {movies.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                    alt={title}
                    className="aspect-2/3 w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-2/3 w-full items-center justify-center bg-slate-800 text-slate-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Details Header */}
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold text-white md:text-5xl">
                  {title}
                </h1>

                {movies.tagline && (
                  <p className="mt-2 text-lg italic text-slate-400">
                    {movies.tagline}
                  </p>
                )}

                {/* Info */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span className="rounded-md bg-amber-500/10 px-2.5 py-1 text-amber-400 font-semibold ring-1 ring-amber-500/20">
                    {movies.vote_average ? (
                      `★ ${movies.vote_average.toFixed(1)}`
                    ) : (
                      <p>N/A</p>
                    )}
                  </span>
                  <span>{calDate}</span>
                  <span>•</span>
                  <span>
                    {movies.runtime
                      ? `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`
                      : ""}
                  </span>
                  <span>
                    {movies?.budget ? `$${movies.budget.toLocaleString()}` : ""}
                  </span>
                </div>

                {/* Genres */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {movies.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-white">Overview</h2>
                  <p className="mt-2 leading-relaxed text-slate-300">
                    {movies.overview}
                  </p>
                </div>
                <button
                  onClick={handleClick}
                  className={`${isSaved ? "bg-red-500" : "bg-blue-500"} mt-5 rounded px-4 py-2 text-white ${isSaved ? "hover:bg-red-600" : "hover:bg-blue-600"} transition-colors `}
                >
                  {isSaved ? "Remove from saves" : "Add to saves"}
                </button>
              </div>
            </div>

            {/* Top Cast Section */}
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-white">Top Cast</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {movies.credits?.cast.length > 0 ? (
                  movies.credits.cast.map((cast) => (
                    <TopCast key={cast.id} cast={cast} />
                  ))
                ) : (
                  <p className="text-slate-400">N/A</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
