import React from "react";
import logo from "../assets/logo.png";
import downloadAppStore from "../assets/download-appstore.png";
import downloadPlayStore from "../assets/download-playstore.png";

function AppStores() {
  return (
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
  );
}

export default AppStores;
