local resourceName = GetCurrentResourceName()

local function getNearPlayers(radius)
    local nearesPlayers = {}
    local ped = PlayerPedId()
    local coords = GetEntityCoords(ped)
    local playersList = GetActivePlayers()
    for _,uPid in pairs(playersList) do
        if NetworkIsPlayerConnected(uPid) then
            local uPed = GetPlayerPed(uPid)
			local uCoords = GetEntityCoords(uPed)
			local distance = #(coords - uCoords)
			if distance <= radius then
				table.insert(nearesPlayers,GetPlayerServerId(uPid))
			end
        end
    end
    return nearesPlayers
end

RegisterCommand(Config.command, function()
    SetNuiFocus(true, true)
    SendNUIMessage({action = 'setVisible', data = true})
end)

RegisterNUICallback('readText', function(data, cb)
    TriggerServerEvent(resourceName..":generateSpeech", data, getNearPlayers(Config.radius))
end)

RegisterNUICallback('readTestText', function(data, cb)
    TriggerServerEvent(resourceName..":generateSpeech", { text = Config.testVoive.text, voice = data.voice, vibe = "" }, {})
end)

RegisterNetEvent(resourceName..":playAudio", function(data)
    SendNUIMessage({
        action = 'playAudio',
        data = data
    })
end)

RegisterNUICallback('closeApp', function(_, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({action = 'setVisible', data = false})
end)


RegisterNUICallback('getData', function(data, cb)
    local vibes = {}
    for v, d  in pairs(Config.vibes) do
        vibes[v] = d.desc
    end
    cb({voices = Config.voices, vibes = vibes})
end)



