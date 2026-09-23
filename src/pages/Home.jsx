import TopDisplay from "../components/TopDisplay";
import TrendingSection from "../components/TrendingSection";

const Home = ({
  duneImage,
  movies,
  type,
  setType,
  description,
  setDescription,
  page,
  setPage,
  loading,
  error,
  loadNext,
  loadPrevious,
  totalPages,
  currentPreview,
  setSaves,
  addMedia,
  saves,
  unCheck,
  added,
  setAdded,
}) => {
  return (
    <>
      <TopDisplay movie={movies[currentPreview]} />
      <TrendingSection
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
        saves={saves}
        setSaves={setSaves}
        addMedia={addMedia}
        unCheck={unCheck}
        added={added}
        setAdded={setAdded}
      />
    </>
  );
};

export default Home;
