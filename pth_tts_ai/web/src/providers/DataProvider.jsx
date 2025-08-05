import { createContext, useEffect, useState } from "react";
import { fetchNui } from "../utils/fetchNui";
import {i18nStart} from "../utils/i18n";

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
        let dataL = { lang: 'en-US',
            langData : {
                        "en-US": {
                            "male": "male",
                            "female": "female",
                            "voices": "voices",
                            "writeText": "Write the text",
                            "read": "Read",
                            "volume": "Volume",
                            "pitch": "Pitch",
                            "textToSpeech": "Text To Speech",
                            "settings": "Settings"
                        },
                        "pt-BR": {
                            "male": "masculino",
                            "female": "feminino",
                            "voices": "vozes",
                            "writeText": "escreva o texto",
                            "read": "ler",
                            "volume": "Volume",
                            "pitch": "Tom",
                            "textToSpeech": "Texto para Fala",
                            "settings": "Configurações"
                        },
                        "fr-FR": {
                            "male": "masculin",
                            "female": "féminin",
                            "voices": "voix",
                            "writeText": "Écrire le texte",
                            "read": "Lire",
                            "volume": "Volume",
                            "pitch": "Hauteur",
                            "textToSpeech": "Synthèse vocale",
                            "settings": "Paramètres"
                        },
                        "es-ES": {
                            "male": "masculino",
                            "female": "femenino",
                            "voices": "voces",
                            "writeText": "Escribir el texto",
                            "read": "Leer",
                            "volume": "Volumen",
                            "pitch": "Tono",
                            "textToSpeech": "Texto a voz",
                            "settings": "Configuración"
                        }
                    }
        }
        async function fetchData() {
            var dataFetched = await fetchNui("getData", {}, dataF);
            setData(dataFetched);

            var {lang, langData} = await fetchNui("getLanguage", {}, dataL);
            i18nStart(lang, langData)
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