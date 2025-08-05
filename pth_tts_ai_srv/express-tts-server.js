// express-tts-server.js
// Express server to generate audio via OpenAI and make it available by URL

import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Directory to store audio files
const audioDir = path.join(process.cwd(), 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Middleware to read JSON in request body
app.use(express.json());

// Serve static files from audio folder
app.use('/audio', express.static(audioDir));

// OpenAI client instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Route to generate audio and return URL
 * Expects JSON object with keys:
 * text: text to be converted to audio
 * voice: desired voice (optional, ex: 'alloy')
 */
app.post('/generate-audio', async (req, res) => {
  try {
    const { voice, input, instructions } = req.body;
    if (!input || input === '') {
      return res.status(400).json({ error: 'Text mandatory' });
    }

    // Generate audio via OpenAI, model tts-1, mp3 format
    const response = await openai.audio.speech.create({
      model: process.env.MODEL_TTS || 'tts-1',
      voice: voice || 'alloy',
      input: input,
      instructions: instructions || '',
      format: 'mp3',
    });

    // Buffer with audio data
    const audioData = Buffer.from(await response.arrayBuffer());

    // Unique filename
    const fileName = `${uuidv4()}.mp3`;
    const filePath = path.join(audioDir, fileName);

    // Save file to disk
    fs.writeFileSync(filePath, audioData);

    // Public file URL
    const fileUrl = `${req.protocol}://${req.get('host')}/audio/${fileName}`;

    // Schedule file cleanup
    setTimeout(() => {
      try {
        fs.unlinkSync(filePath);
        console.log(`Expired file removed: ${fileName}`);
      } catch (err) {
        console.error(`Error removing expired file: ${fileName}:`, err);
      }
    }, process.env.AUDIO_EXPIRATION * 60 * 1000);

    return res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error generating audio:', error);
    return res.status(500).json({ error: 'Failed to generate audio' });
  }
});

const cleanOldAudioFiles = (maxAgeMinutes) => {
  const files = fs.readdirSync(audioDir);
  const now = Date.now();
  
  files.forEach(file => {
    const filePath = path.join(audioDir, file);
    const stats = fs.statSync(filePath);
    const fileAge = (now - stats.mtimeMs) / (1000 * 60); // age in minutes
    
    if (fileAge > maxAgeMinutes) {
      try {
        fs.unlinkSync(filePath);
        console.log(`File removed: ${file}`);
      } catch (err) {
        console.error(`Error removing file ${file}:`, err);
      }
    }
  });
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  // Clean old files on startup
  cleanOldAudioFiles(process.env.AUDIO_EXPIRATION);
  // Schedule periodic cleanup every 30 minutes
  setInterval(() => cleanOldAudioFiles(process.env.AUDIO_EXPIRATION), process.env.AUDIO_SCHEDULE_CLEANUP * 60 * 1000);
});
