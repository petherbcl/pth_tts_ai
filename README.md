# PTH Text-to-Speech AI

A FiveM resource that provides AI-powered text-to-speech capabilities using OpenAI's TTS API. The project consists of two main components:

## Components

### 1. FiveM Resource (pth_tts_ai)
A FiveM resource that provides in-game text-to-speech functionality with:
- Web-based UI built with React and Tailwind CSS
- Multiple AI voices to choose from
- Different emotional tones for speech
- Proximity-based audio sharing between players
- Volume control
- Easy-to-use command system

### 2. Express Server (pth_tts_ai_srv)
A Node.js Express server that handles:
- OpenAI API integration for text-to-speech generation
- Audio file management and cleanup
- URL-based audio delivery

## Installation

### Express Server Setup
1. Navigate to the server directory:
```sh
cd pth_tts_ai_srv
```

2. Install dependencies:
```sh
npm install
```

3. Configure environment variables by creating a `.env` file:
```sh
OPENAI_API_KEY=your_openai_api_key
PORT=3000
AUDIO_EXPIRATION=5
AUDIO_SCHEDULE_CLEANUP=30
```

4. Start the server:
```sh
node express-tts-server.js
```

### FiveM Resource Setup
1. Copy the `pth_tts_ai` folder to your FiveM server's resources directory

2. Add to your server.cfg:
```cfg
ensure pth_tts_ai
```

3. If developing the web UI, navigate to the web directory:
```sh
cd pth_tts_ai/web
npm install
npm run dev:game
```

## Usage

1. In-game, use the command `/tts` to open the TTS interface
2. Type your text and select:
   - Voice (male/female options)
   - Emotional tone
   - Volume level
3. Click "Read" to generate and play the speech

## Features

- Multiple AI voices (male and female options)
- Emotional tones: calm, emotional, sad, surprise, afraid, happy
- Volume control
- Proximity-based speech sharing
- Automatic audio file cleanup
- Web-based UI with React
- Real-time audio playback

## Configuration

### Server Config (serverConfig.lua)
- `SERVER_HOST`: Express server address
- `REMOVE_AUDIO_MIN`: Audio file expiration time
- `MODEL_TTS`: OpenAI TTS model to use

### Shared Config (shared.lua)
- `command`: Command to open TTS interface
- `radius`: Proximity radius for speech sharing
- Voice and emotion configurations

## Development

The web UI is built with:
- React
- Tailwind CSS
- DaisyUI
- TypeScript
- Vite

To develop the web UI:
```sh
cd web
npm run build
```

## License

[Your License Here]
