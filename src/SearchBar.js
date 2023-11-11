import { useContext, useEffect, useMemo, useState, useRef } from "react";

import { StoreContext } from "./Map";

const SearchBar = () => {
  const wrapper = useRef();
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");

  const { stores, map } = useContext(StoreContext);

  const results = useMemo(
    () =>
      search &&
      stores
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 10),
    [stores, search]
  );

  useEffect(() => {
    function listener(e) {
      setFocus(wrapper.current?.contains(e.target));
    }
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  const open = focus && results;

  const onFound = (store) => {
    if (!map) {
      return;
    }
    setSearch(store.name);
    setFocus(false);
    map.flyTo({
      center: [store.longitude, store.latitude],
      zoom: 18,
      speed: 3,
    });
  };

  return (
    <div
      ref={wrapper}
      className="absolute z-10 rounded-3xl md:w-[350px] left-5 top-2 right-5 bg-white md:left-5 md:top-4"
    >
      <div className="flex">
        <input
          className={`p-3 pl-7 w-full outline-none ${
            open &&
            "rounded-bl-none rounded-br-none border-b-[1px] border-b-gray-200"
          } rounded-3xl ${!open && "shadow-lg"}`}
          placeholder="Rechercher"
          onFocus={() => setFocus(true)}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {search && (
          <div
            onClick={() => setSearch("")}
            className="absolute right-5 top-3 rounded-full cursor-pointer w-[15px] h-[15px] p-[13px] text-center flex justify-center items-center hover:bg-gray-100"
          >
            ✕
          </div>
        )}
      </div>
      {open && (
        <div className="top-5 shadow-lg rounded-3xl">
          <ul>
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => onFound(result)}
                className="p-2 pl-5 cursor-pointer hover:bg-gray-100"
              >
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
