import { useContext } from "react";
import { fetchNui } from "../utils/fetchNui";
import { DataContext } from "../providers/DataProvider";
import { capitalize } from "../utils/misc"; // Importing for utility functions

import { useTranslation } from "react-i18next"; // Importing for i18n support


export default function TextToSpeech() {
    const { t } = useTranslation(); // Using the translation function
    const { data, dataCache } = useContext(DataContext);

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const vibeRadio = fd.getAll("vibe")[0];

        fetchNui("readText", { text: data.text, voice: dataCache.voice, vibe: vibeRadio, volume: data.volume })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea className="textarea h-24 w-full bg-gray-200" placeholder={capitalize(t('writeText'))} name="text"></textarea>

            <button className="btn w-full bg-yellow-500 hover:bg-yellow-400 text-lg font-semibold">{capitalize(t('read'))}</button>

            <span className="font-semibold text-md border-b-2 border-yellow-400">{capitalize(t('volume'))}</span>
            <div className="w-full ">
                <input type="range" name="volume" min={0} max="1" step="0.01" className="slider w-full"  style={{color: "#eab308"}}/>
                <div className="flex justify-between px-2.5 mt-2 text-xs">
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                    <span>|</span>
                </div>
                <div className="flex justify-between px-2.5 mt-2 text-xs font-semibold">
                    <span>0</span>
                    <span>10</span>
                    <span>20</span>
                    <span>30</span>
                    <span>40</span>
                    <span>50</span>
                    <span>60</span>
                    <span>70</span>
                    <span>80</span>
                    <span>90</span>
                    <span>100</span>
                </div>
            </div>

            <span className="font-semibold text-md border-b-2 border-yellow-400">{capitalize(t('pitch'))}</span>
            <div className="grid grid-cols-2 gap-2">
                {data.vibes && Object.entries(data.vibes).map(([key, value], index) => (
                    <div key={index}>
                        <input type="radio" name="vibe" value={key} defaultChecked={index === 0} className="radio bg-yellow-200 border-yellow-200 checked:bg-yellow-400 checked:text-yellow-400 checked:border-yellow-400" />
                        <span className="ml-2">{capitalize(value)}</span>
                    </div>
                ))}
            </div>
        </form>
    )
}