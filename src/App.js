import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "./App.css";
import Seo from "./Seo.js";

import logo from "./images/logo.png";
import downloadAppStore from "./images/download-appstore.png";
import downloadPlayStore from "./images/download-playstore.png";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [stores, setStores] = useState([]);

  const fetchData = async () => {
    const res = await fetch("https://api.leqg.app/v1/stores");
    setStores(await res.json());
  };

  const storesSource = useMemo(
    () => ({
      type: "FeatureCollection",
      features: stores.map((store) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [store.lng, store.lat],
        },
        properties: store,
      })),
    }),
    [stores]
  );

  useEffect(() => fetchData(), []);

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
        map.current.addImage("tooltip", image);
        map.current.addLayer({
          id: "storesPrices",
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
        map.current.on("mouseenter", "storesPrices", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "storesPrices", () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
    });
  }, [stores]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Seo />
      <div ref={mapContainer} className="map-container" />
      <div className="absolute bg-white p-6 bottom-0 left-0 right-0 flex justify-center items-center flex-row md:w-[400px] md:left-10 md:bottom-10">
        <img
          className="w-[100px] md:mr-6"
          src={logo}
          alt="Logo de l'application Le QG"
        />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-5xl">Le QG</h1>
          <div className="flex flex-row mt-6">
            <a
              href="https://apps.apple.com/fr/app/le-qg-trouve-ton-bar/id1598889294"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-[100px] mr-2"
                src={downloadAppStore}
                alt="Download on AppStore"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.leqg"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="w-[107px]"
                src={downloadPlayStore}
                alt="Download on PlayStore"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
