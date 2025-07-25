import { useContext, useState } from "react";
import { debugData } from "./utils/debugData";
import TextToSpeech from "./components/TextToSpeech";
import Settings from "./components/Settings";
import { VisibilityContext } from "./providers/VisibilityProvider";
import { capitalize } from "./utils/misc"; // Importing for utility functions

import { useTranslation } from "react-i18next"; // Importing for i18n support


// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App = () => {
  const { t } = useTranslation(); // Using the translation function

  const [onSettings, setOnSettings] = useState(false);
  const { visible } = useContext(VisibilityContext);


  return <div className="flex flex-col items-end justify-center min-h-screen">
    <div className="card bg-gray-50 w-96 shadow-sm">
      <div className="card-body p-3">


        <div style={{ visibility: !onSettings && visible ? "visible" : "hidden", display: !onSettings ? "contents" : "none" }}>
          <div className="flex items-center gap-2">
            <button className="btn btn-circle btn-xs bg-amber-400 text-amber-700" onClick={() => setOnSettings(true)}>
              <i className="fa-solid fa-gear"></i>
            </button>
            <span className="card-title">{capitalize(t('textToSpeech'))}</span>
          </div>

          <TextToSpeech />
        </div>

        <div style={{ visibility: onSettings && visible ? "visible" : "hidden", display: onSettings ? "contents" : "none" }}>
          <div className="flex items-center gap-2">
            <button className="btn btn-circle btn-xs bg-amber-400 text-amber-700" onClick={() => setOnSettings(false)}>
              <i className="fa-solid fa-angle-left"></i>
            </button>
            <span className="card-title">{capitalize(t('settings'))}</span>
          </div>

          <Settings />
        </div>


        {/* {!onSettings &&
          <>
          <div className="flex items-center gap-2">
            <button className="btn btn-circle btn-xs bg-yellow-500" onClick={() => setOnSettings(true)}>
              <img src={gearImg}></img>
            </button>
            <span className="card-title">Text To Speech</span>
          </div>
            
            <TextToSpeech />
          </>
        }
        {onSettings &&
        <>
          <div className="flex items-center gap-2">
            <button className="btn btn-circle btn-xs bg-yellow-500" onClick={() => setOnSettings(false)}>
              <img src={backImg}></img>
            </button>
            <span className="card-title">Settings</span>
          </div>

          <Settings />
          </>
        } */}

      </div>
    </div>
  </div>;
};

export default App;