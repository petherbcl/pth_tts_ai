fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name "pth_tts_ai"
description "Text to Speech with AI integration for FiveM"
author "petherbcl"
version "0.0.1"

shared_scripts {
	'shared/*.lua'
}

client_scripts {
	'client/*.lua'
}

server_scripts {
	'server/*.lua',
	'server/*.js',
}

ui_page 'web/build/index.html'
file_directory 'audio'
files {
	'modules/nui.lua', 
	'web/build/index.html', 
	'web/build/**/*',
	'audio/*'}