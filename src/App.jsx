import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Saves from "./pages/Saves";
import image from "/src/assets/image.png";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("movie");
  const [description, setDescription] = useState("trending");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPreview, setCurrentPreview] = useState(0);
  const [saves, setSaves] = useState(() => {
    const getSavedItems = JSON.parse(localStorage.getItem("savedItems"));
    return getSavedItems || [];
  });
  const [added, setAdded] = useState(false);

  // get endpoint

  // const endpoint =
  //   description === "trending"
  //     ? `trending/${type}/day`
  //     : description === "now_playing"
  //       ? type === "movie"
  //         ? "movie/now_playing"
  //         : "tv/on_the_air"
  //       : description === "top_rated"
  //         ? `${type}/top_rated`
  //         : `${type}/${description}`;

  function getEndpoint(type, description) {
    switch (description) {
      case "trending":
        return `trending/${type}/day`;

      case "now_playing":
        return type === "movie" ? "movie/now_playing" : "tv/on_the_air";

      case "top_rated":
        return `${type}/top_rated`;

      default:
        return `${type}/${description}`;
    }
  }
  const endpoint = getEndpoint(type, description);

  
  // fetch media
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`,
        );
        if (!response.ok) {
          throw new Error(`TMDB request failed (${response.status})`);
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type, description, endpoint, page]);

  const loadNext = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const loadPrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    if (movies.length === 0) return;

    const theInterval = setInterval(() => {
      setCurrentPreview((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= movies.length ? 0 : nextIndex;
      });
    }, 10000);

    return () => clearInterval(theInterval);
  }, [movies.length]);

  // const addMedia = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setSaves((prev) => {
  //     const isAlreadySaved = prev.some((saved) => saved.id === movies.id); //some will return true and stop running immediately it finds a match

  //     return isAlreadySaved ? prev : [movies, ...prev]; //if it exist, return the existing list without adding, else add it
  //   });
  // };

  const addMedia = (media) => {
    setSaves((prev) => {
      const isAlreadySaved = prev.some((saved) => saved.id === media.id); //some will return true and stop running immediately it finds a match

      return isAlreadySaved ? prev : [media, ...prev]; //if it exist, return the existing list without adding, else add it
    });
  };

  const deleteItem = (id) => {
    if (!confirm("Are you sure?")) return;
    const notDeleted = saves.filter((save) => save.id !== id);
    setSaves(notDeleted);
  };

  const unCheck = (id) => {
    const notDeleted = saves.filter((save) => save.id !== id);
    setSaves(notDeleted);
  };

  //save to localStrorage
  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(saves));
  }, [saves]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              type={type}
              setType={setType}
              description={description}
              setDescription={setDescription}
              movies={movies}
              page={page}
              setPage={setPage}
              loading={loading}
              error={error}
              loadNext={loadNext}
              loadPrevious={loadPrevious}
              totalPages={totalPages}
              currentPreview={currentPreview}
              setSaves={setSaves}
              saves={saves}
              addMedia={addMedia}
              unCheck={unCheck}
              added={added}
              setAdded={setAdded}
            />
          }
        />
        <Route
          path="/Saves"
          element={
            <Saves
              image={image}
              saves={saves}
              movies={movies}
              deleteItem={deleteItem}
              type={type}
            />
          }
        />
        <Route
          path="/details/:type/:id"
          element={
            <MovieDetails addMedia={addMedia} unCheck={unCheck} saves={saves} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
