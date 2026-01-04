/**
 * Decompresses a store from the API format to a full store object
 * @param {Array} compressedStore - Array format from API
 * @returns {Object} Full store object
 */
export function decompressStore(compressedStore) {
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

/**
 * Fetches stores from the API
 * @returns {Promise<Array>} Array of decompressed stores
 */
export async function fetchStores() {
  const res = await fetch("https://api.leqg.app/v2/stores");
  const stores = await res.json();
  return stores.map(decompressStore).filter((store) => store.price);
}

