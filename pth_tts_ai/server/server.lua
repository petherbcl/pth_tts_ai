local resourceName = GetCurrentResourceName()

RegisterNetEvent(resourceName..":generateSpeech", function(data, playerList)
    local source = source
    PerformHttpRequest("http://"..ServerCgf.SERVER_HOST.."/generate-audio", function(errorCode, resultData, resultHeaders, errorData)
        if errorCode ~= 200 then
            print("Error generating speech: ", errorCode, resultData, json.encode(errorData))
            return
        end

        local audioURL = json.decode(resultData).url

        if(playerList and #playerList > 0) then
            for _, src in pairs(playerList) do
                TriggerClientEvent(resourceName..":playAudio", src, {audioURL = audioURL, volume = data.volume})
            end
        else
            TriggerClientEvent(resourceName..":playAudio", source, {audioURL = audioURL, volume = data.volume})
        end

    end, 'POST', json.encode({
        voice = data.voice,
        input = data.text,
        instructions = Config.vibes[data.vibe]?.instructions
    }), {
        ['Content-Type'] = 'application/json'
    })
end)


local function generateSpeech(source, data)
    local source = source

        PerformHttpRequest("http://"..ServerCgf.SERVER_HOST.."/generate-audio", function(errorCode, resultData, resultHeaders, errorData)
        if errorCode ~= 200 then
            print("Error generating speech: ", errorCode, resultData, json.encode(errorData))
            return
        end

        local audioURL = json.decode(resultData).url
        TriggerClientEvent(resourceName..":playAudio", source, {audioURL = audioURL, volume = data.volume})

    end, 'POST', json.encode({
        voice = data.voice,
        input = data.text,
        instructions = Config.vibes[data.vibe]?.instructions
    }), {
        ['Content-Type'] = 'application/json'
    })

end

exports("textToSpeech", generateSpeech)