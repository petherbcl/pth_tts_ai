import { createContext, useEffect, useState } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useTranslation } from "react-i18next";

export const DataContext = createContext({
    data: {},
    dataCache: {},
    updateDataCache: () => { }
});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({});
    const [dataCache, setDataCache] = useState({ voice: 'ash' });
    const {i18n} = useTranslation();

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
            setData(dataFetched);

            var dataLangFetched = await fetchNui("getLanguage", {}, 'pt-BR');
            i18n.changeLanguage(dataLangFetched)
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