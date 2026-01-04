import { useEffect, useState } from "react";
import { StoreContext } from "../contexts/StoreContext";
import { fetchStores } from "../utils/storeHelpers";
import Seo from "../components/Seo";
import SearchBar from "../components/SearchBar";
import Mapbox from "../components/Mapbox";

function Map() {
  const [stores, setStores] = useState([]);
  const [map, setMap] = useState(undefined);

  useEffect(() => {
    (async () => {
      const fetchedStores = await fetchStores();
      setStores(fetchedStores);
    })();
  }, []);

  return (
    <StoreContext.Provider value={{ stores, map, setMap }}>
      <Seo />
      <SearchBar />
      <Mapbox />
    </StoreContext.Provider>
  );
}

export default Map;
