import { useRef, useMemo, useEffect, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import { StoreContext } from "./Map";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Mapbox() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { stores, setMap } = useContext(StoreContext);

  const storesSource = useMemo(
    () => ({
      type: "FeatureCollection",
      features: stores.map((store) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [store.longitude, store.latitude],
        },
        properties: store,
      })),
    }),
    [stores]
  );

  useEffect(() => {
    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v10",
      bounds: [
        [-5, 51.2],
        [8.377415, 42.1],
      ],
    });
    setMap(map.current);
  }, [map]);

  useEffect(() => {
    if (!stores.length) {
      return;
    }
    map.current.on("load", function () {
      map.current.addSource("stores", {
        type: "geojson",
        data: storesSource,
      });
      map.current.loadImage("/tooltip-50.png", (error, image) => {
        if (error) {
          throw error;
        }
        map.current.addLayer({
          id: "storeName",
          type: "symbol",
          source: "stores",
          layout: {
            "text-field": ["get", "name"],
            "text-justify": "auto",
            "text-optional": true,
            "text-variable-anchor": [
              "left",
              "right",
              "top",
              "bottom",
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ],
            "text-radial-offset": 1.1,
            "text-size": 12,
          },
          paint: {
            "text-color": "#000",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
            "text-translate": [0, -11],
          },
        });
        map.current.addImage("tooltip", image);
        map.current.addLayer({
          id: "storePrice",
          type: "symbol",
          source: "stores",
          layout: {
            "icon-image": "tooltip",
            "icon-size": 0.5,
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "symbol-sort-key": ["get", "price"],

            "text-field": ["to-string", ["get", "price"]],
            "text-size": 13,
            "text-max-width": 50,
            "text-anchor": "center",
            "text-allow-overlap": false,
            "text-ignore-placement": false,
          },
          paint: {
            "icon-translate": [0, -10],
            "text-color": "#FFF",
            "text-translate": [0, -13],
          },
        });
        map.current.on("mouseenter", "storePrice", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "storePrice", () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
    });
  }, [stores]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mapContainer} className="map-container" />;
}

export default Mapbox;
