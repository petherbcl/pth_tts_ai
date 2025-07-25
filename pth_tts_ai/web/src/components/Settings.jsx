import { useContext } from "react";
import { DataContext } from "../providers/DataProvider";
import playIcon from "../assets/play.svg";
import { fetchNui } from "../utils/fetchNui";

export default function Settings() {

    const { data, dataCache, updateDataCache } = useContext(DataContext);
    function handleVoiceChange(event) {
        const selectedVoice = event.target.value;
        updateDataCache(dataCache.voice = selectedVoice);
    }

    function playTestAudio(voice) {
        fetchNui("readTestText", { voice: voice })
    } 

    return (
        <>
            <span className="card-title">Voices</span>

            <span className="font-semibold text-md w-full border-b-2 border-yellow-400">Male</span>
            <div className="grid grid-cols-2 gap-2">
                {data.voices && data.voices.male && Object.entries(data.voices.male).map(([key, value], index) => (
                    <div key={index} className="flex items-center gap-1">
                        <input type="radio" name="voices" value={key} defaultChecked={dataCache.voice === key} className="radio bg-yellow-200 border-yellow-200 checked:bg-yellow-400 checked:text-yellow-400 checked:border-yellow-400" onChange={handleVoiceChange} />
                        <span className="ml-2">{value}</span>

                        <button className="btn btn-square btn-xs bg-amber-100 text-amber-200 hover:bg-amber-400 hover:text-amber-700" onClick={() => playTestAudio(key)}>
                            <i className="fa-solid fa-play"></i>
                        </button>

                    </div>
                ))}
            </div>

            <span className="font-semibold text-md border-b-2 border-yellow-400">Female</span>
            <div className="grid grid-cols-2 gap-2">
                {data.voices && data.voices.female && Object.entries(data.voices.female).map(([key, value], index) => (
                    <div key={index} className="flex items-center gap-1">
                        <input type="radio" name="voices" value={key} defaultChecked={dataCache.voice === key} className="radio bg-yellow-200 border-yellow-200 checked:bg-yellow-400 checked:text-yellow-400 checked:border-yellow-400" onChange={handleVoiceChange} />
                        <span className="ml-2">{value}</span>

                        <button className="btn btn-square btn-xs bg-amber-100 text-amber-200 hover:bg-amber-400 hover:text-amber-700" onClick={() => playTestAudio(key)}>
                            <i className="fa-solid fa-play"></i>
                        </button>
                    </div>
                ))}
            </div>

        </>
    );
}