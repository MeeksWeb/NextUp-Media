const Select = ({ description, setDescription, type }) => {
  return (
    <div>
      <label htmlFor="Sort">Sort By:</label>
      <select
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        <option value="trending">Trending</option>
        <option value="top_rated">Top Rated</option>
        <option value="now_playing">
          {type === "movie" ? "Now Playing" : "On TV"}
        </option>
      </select>
    </div>
  );
};

export default Select;
