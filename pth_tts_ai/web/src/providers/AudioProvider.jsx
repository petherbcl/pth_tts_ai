import { createContext, useCallback, useState } from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";

const AudioCtx = createContext(null);

export const AudioProvider = ({ children }) => {

    const [audio] = useState(new Audio());

    const playSound = useCallback((data) => {
        try {
            audio.pause();
            audio.src = data.audioURL;
            audio.currentTime = 0;
            audio.volume = data.volume || 1; // Default volume to 1 if not provided
            audio.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        } catch (error) {
            console.error("Error setting up audio:", error);
        }
    }, [audio]);

    useNuiEvent("playAudio", function (data) {
        playSound(data);
    })

    return (
        <AudioCtx.Provider value={{}}>
            {children}
        </AudioCtx.Provider>
    )
}