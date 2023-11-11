import { createContext, useEffect, useState } from "react";

import "./App.css";
import Seo from "./Seo.js";

import SearchBar from "./SearchBar.js";
import Mapbox from "./Mapbox.js";

function decompressStore(compressedStore) {
  const [id, name, address, longitude, latitude, price, specialPrice] =
    compressedStore;
  return {
    id,
    name,
    address,
    longitude,
    latitude,
    price,
    specialPrice,
  };
}

export const StoreContext = createContext({ stores: [] });

function Map() {
  const [stores, setStores] = useState([]);
  const [map, setMap] = useState(undefined);

  useEffect(() => {
    (async () => {
      const res = await fetch("https://api.leqg.app/v2/stores");
      const stores = await res.json();
      setStores(stores.map(decompressStore).filter((store) => store.price));
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
