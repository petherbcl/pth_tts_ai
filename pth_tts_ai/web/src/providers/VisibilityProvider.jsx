import { createContext, useContext, useEffect, useState, } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";

export const VisibilityContext = createContext({
    visible: false,
    setVisible: () => { },
});

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);

    useNuiEvent("setVisible", setVisible);

    useEffect(() => {
        if (!visible) return;

        const keyHandler = (e) => {
            if (["Escape"].includes(e.code)) {
                if (!isEnvBrowser()) fetchNui("closeApp");
                else setVisible(!visible);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [visible]);

    return (
        <VisibilityContext.Provider value={{ visible, setVisible, }}>
            <div
                style={{ visibility: visible ? "visible" : "hidden", height: "100%", }}>
                {children}
            </div>
        </VisibilityContext.Provider>
    );
};

