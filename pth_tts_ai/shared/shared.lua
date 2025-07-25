Config = {
    language = 'en-US',

    command = 'tts',
    radius = 2, -- Radius to find players nearbyPlayers

    testVoive = {
        text = 'Hello, this is a voice test. I hope you are enjoying it!',
    },

    voices = {
        male = {
            ash = 'Ash',
            ballad = 'Ballad',
            echo = 'Echo',
            onyx = 'Onyx',
            verse = 'Verse'
        },
        female = {
            alloy = 'Alloy',
            coral = 'Coral',
            fable = 'Fable',
            nova = 'Nova',
            sage = 'Sage',
            shimmer = 'Shimmer'
        }
    },

    vibes = {
        calm = {
            desc = 'Calm',
            instructions = [[
Voice Affect: voz suave e relaxada que transmite segurança;
Tone: tranquilo e equilibrado;
Pacing: ritmo lento a moderado que inspira calma;
Emotion: serenidade e confiança;
Pronunciation: articulação clara com vogais ligeiramente alongadas;
Pauses: espaçadas e naturais entre as frases.
                            ]]
        },
        emotional = {
            desc = 'Emotional',
            instructions = [[
Voice Affect: voz calorosa e vibrante que envolve o ouvinte;
Tone: entusiasmado e dinâmico;
Pacing: ritmo ligeiramente acelerado que reflete excitação;
Emotion: paixão e energia;
Pronunciation: ênfase acentuada em palavras-chave;
Pauses: breves silêncios antes de pontos de clímax emocional.
                            ]]
        },
        sad = {
            desc = 'Sad',
            instructions = [[
Voice Affect: voz suave e melancólica;
Tone: grave e compassivo;
Pacing: ritmo lento que reforça o sentimento de dor;
Emotion: tristeza e pesar;
Pronunciation: articulação menos vigorosa com leve tremor;
Pauses: mais longas e reflexivas entre as frases.
                            ]]
        },
        surprise = {
            desc = 'Surprised',
            instructions = [[
Voice Affect: voz aguda e aberta que revela espanto;
Tone: vibrante e curioso;
Pacing: ritmo rápido e inesperado;
Emotion: surpresa e admiração;
Pronunciation: vogais mais abertas e ênfase em sílabas-chave;
Pauses: breve hesitação imediata após a expressão de surpresa.
                            ]]
        },
        affraid = {
            desc = 'Scared',
            instructions = [[
Voice Affect: voz trêmula e tensa;
Tone: agudo e alarmado;
Pacing: ritmo irregular e acelerado;
Emotion: medo e apreensão;
Pronunciation: pronúncia fragmentada com ênfase em consoantes finais;
Pauses: interrupções abruptas e imprevisíveis que marcam o sobressalto.
                            ]]
        },
        happy = {
            desc = 'Happy',
            instructions = [[
Voice Affect: voz clara e radiante que transmite alegria e energia;
Tone: leve e otimista;
Pacing: ritmo moderado a ligeiramente acelerado que reflete entusiasmo;
Emotion: felicidade contagiante e positividade;
Pronunciation: articulação vivaz, vogais abertas e sílabas ressaltadas;
Pauses: breves e ritmadas para enfatizar a vivacidade.
]]
        }
    }
}