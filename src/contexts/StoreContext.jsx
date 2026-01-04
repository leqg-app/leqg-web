import { createContext } from "react";

export const StoreContext = createContext({
  stores: [],
  map: undefined,
  setMap: () => {},
});
