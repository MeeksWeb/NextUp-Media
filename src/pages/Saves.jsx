import { useState } from "react";
import SavesCard from "../components/SavesCard";

const Saves = ({ saves, deleteItem, type }) => {
  const [getFilter, setGetFilter] = useState("");

  const filteredItem = saves.filter((save) =>
    (save.title ?? save.name ?? "")
      .toLowerCase()
      .includes(getFilter.toLowerCase()),
  );

  return (
    <div className="mx-auto mt-25 max-w-7xl md:w-[calc(100%-2rem)]">
      {saves.length > 0 ? (
        <input
          type="text"
          value={getFilter}
          onChange={(e) => setGetFilter(e.target.value)}
          placeholder="filter by title..."
          className="mt-3 block w-full rounded-lg bg-gray-200 p-2 text-gray-800 sm:mt-6 sm:w-120"
        />
      ) : null}

      {saves.length === 0 && (
        <p className="mt-50 text-center">No saves, yet!</p>
      )}

      {
        <div className="flex flex-col gap-5 mt-4 w-full max-w-7xl  mx-auto ">
          {filteredItem?.map((save) => (
            <SavesCard
              key={save.id}
              save={save}
              deleteItem={deleteItem}
              type={type}
            />
          ))}
        </div>
      }
      {getFilter && filteredItem.length === 0 && (
        <p className="mt-50 text-center">Search not found</p>
      )}
    </div>
  );
};

export default Saves;
