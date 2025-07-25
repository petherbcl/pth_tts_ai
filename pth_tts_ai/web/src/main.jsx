import ReactDOM from "react-dom/client";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import { RecoilRoot } from "recoil";
import "./index.css";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import App from "./App";
import { DataProvider } from "./providers/DataProvider";
import { AudioProvider } from "./providers/AudioProvider";
import "./utils/i18n";

// setup Day.js
dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AudioProvider>
    <DataProvider>
      <VisibilityProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </VisibilityProvider>
    </DataProvider>
  </AudioProvider>
);