// express-tts-server.js
// Servidor Express para gerar áudio via OpenAI e disponibilizar por URL

import express from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Diretório para armazenar arquivos de áudio
const audioDir = path.join(process.cwd(), 'audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// Middleware para ler JSON no corpo das requisições
app.use(express.json());

// Servir arquivos estáticos da pasta audio
app.use('/audio', express.static(audioDir));

// Instância do cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const cleanOldAudioFiles = (maxAgeMinutes) => {
  const files = fs.readdirSync(audioDir);
  const now = Date.now();
  
  files.forEach(file => {
    const filePath = path.join(audioDir, file);
    const stats = fs.statSync(filePath);
    const fileAge = (now - stats.mtimeMs) / (1000 * 60); // idade em minutos
    
    if (fileAge > maxAgeMinutes) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Arquivo removido: ${file}`);
      } catch (err) {
        console.error(`Erro ao remover arquivo ${file}:`, err);
      }
    }
  });
};

/**
 * Rota para gerar áudio e devolver URL
 * Espera objeto JSON com as chaves:
 * text: texto a ser convertido em áudio
 * voice: voz desejada (opcional, ex: 'alloy')
 */
app.post('/generate-audio', async (req, res) => {
  try {
    const { model, voice, input, instructions, expiresIn } = req.body;
    const audioExpiration = expiresIn || 5; // padrão 5 minutos
    if (!input || input === '') {
      return res.status(400).json({ error: 'Campo text é obrigatório' });
    }

    // Gerar áudio via OpenAI, modelo tts-1, formato mp3
    const response = await openai.audio.speech.create({
      model: model || 'tts-1',
      voice: voice || 'alloy',
      input: input,
      instructions: instructions || '',
      format: 'mp3',
    });

    // Buffer com dados de áudio
    const audioData = Buffer.from(await response.arrayBuffer());

    // Nome único para o arquivo
    const fileName = `${uuidv4()}.mp3`;
    const filePath = path.join(audioDir, fileName);

    // Salvar arquivo em disco
    fs.writeFileSync(filePath, audioData);

    // URL pública do arquivo
    const fileUrl = `${req.protocol}://${req.get('host')}/audio/${fileName}`;

    // Agendar limpeza do arquivo
    setTimeout(() => {
      try {
        fs.unlinkSync(filePath);
        console.log(`Arquivo expirado removido: ${fileName}`);
      } catch (err) {
        console.error(`Erro ao remover arquivo expirado ${fileName}:`, err);
      }
    }, audioExpiration * 60 * 1000);

    return res.json({ url: fileUrl });
  } catch (error) {
    console.error('Erro ao gerar áudio:', error);
    return res.status(500).json({ error: 'Falha ao gerar áudio' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  // Limpar arquivos antigos ao iniciar
  cleanOldAudioFiles(process.env.AUDIO_EXPIRATION);
  // Agendar limpeza periódica a cada 30 minutos
  setInterval(() => cleanOldAudioFiles(process.env.AUDIO_EXPIRATION), process.env.AUDIO_SCHEDULE_CLEANUP * 60 * 1000);

});
