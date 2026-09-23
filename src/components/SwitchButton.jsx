const SwitchButton = ({ movieActive, setMovies, name }) => {
  return (
    <>
      <button
        className={`px-4 py-2 font-bold text-white hover:bg-gray-600 rounded-md transform transition duration-300 ease-in-out ${movieActive ? "bg-black" : "bg-gray-300 text-gray-700"}`}
        onClick={setMovies}
      >
        {name}
      </button>
    </>
  );
};

export default SwitchButton;
