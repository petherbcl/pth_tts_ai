import { createContext, useContext, useEffect, useState } from "react";
import { fetchNui } from "../utils/fetchNui";

export const DataContext = createContext({
    data: {},
    dataCache: {},
    updateDataCache: () => { }
});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [dataCache, setDataCache] = useState({ voice: 'ash' });

    useEffect(() => {
        let dataF = {
            "vibes": {
                "affraid": "Assustado",
                "calm": "Calmo",
                "emotional": "Emocionado",
                "happy": "Feliz",
                "sad": "Triste",
                "surprise": "Surpreso",
                "whisper": "Sussurro"
            },
            "voices": {
                "female": {
                    "alloy": "Alloy",
                    "coral": "Coral",
                    "fable": "Fable",
                    "nova": "Nova",
                    "sage": "Sage",
                    "shimmer": "Shimmer"
                },
                "male": {
                    "ash": "Ash",
                    "ballad": "Ballad",
                    "echo": "Echo",
                    "onyx": "Onyx",
                    "verse": "Verse"
                }
            }
        }
        async function fetchData() {
            var dataFetched = await fetchNui("getData", {}, dataF);
            // console.log("Data fetched from NUI:", dataFetched);
            setData(dataFetched);
        }

        fetchData();
        var cache = JSON.parse(localStorage.getItem("pth_tts_ai")) || { voice: 'ash' };
        setDataCache(cache)
    }, [])

    function updateDataCache(newData) {
        setDataCache(prevCache => ({ ...prevCache, ...newData }));
        localStorage.setItem("pth_tts_ai", JSON.stringify(dataCache));
    }
    return (
        <DataContext.Provider value={{ data, dataCache, updateDataCache }}>
            {children}
        </DataContext.Provider>
    )
}

// export const useData = () => useContext(DataCtx);