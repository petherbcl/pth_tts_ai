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
Voice Affect: soft and relaxed voice that conveys confidence;
Tone: calm and balanced;
Pacing: slow to moderate pace that inspires calm;
Emotion: serenity and confidence;
Pronunciation: clear articulation with slightly elongated vowels;
Pauses: spaced and natural between sentences.
                            ]]
        },
        emotional = {
            desc = 'Emotional',
            instructions = [[
Voice Affect: warm and vibrant voice that envelops the listener;
Tone: enthusiastic and dynamic;
Pacing: slightly accelerated pace that reflects excitement;
Emotion: passion and energy;
Pronunciation: strong emphasis on key words;
Pauses: brief silences before points of emotional climax.
                            ]]
        },
        sad = {
            desc = 'Sad',
            instructions = [[
Voice Affect: soft and melancholic voice;
Tone: deep and compassionate;
Pacing: slow pace that reinforces the feeling of pain;
Emotion: sadness and sorrow;
Pronunciation: less vigorous articulation with a slight tremor;
Pauses: longer and reflective between sentences.
                            ]]
        },
        surprise = {
            desc = 'Surprised',
            instructions = [[
Voice Affect: high and open voice that reveals astonishment;
Tone: vibrant and curious;
Pacing: rapid and unexpected pace;
Emotion: surprise and wonder;
Pronunciation: more open vowels and emphasis on key syllables;
Pauses: brief hesitation immediately after expressing surprise.
                            ]]
        },
        affraid = {
            desc = 'Scared',
            instructions = [[
Voice Affect: trembling and tense voice;
Tone: sharp and alarmed;
Pacing: irregular and accelerated pace;
Emotion: fear and apprehension;
Pronunciation: fragmented pronunciation with emphasis on final consonants;
Pauses: abrupt and unpredictable interruptions that mark the startle.
                            ]]
        },
        happy = {
            desc = 'Happy',
            instructions = [[
Voice Affect: clear and radiant voice that conveys joy and energy;
Tone: light and optimistic;
Pacing: moderate to slightly accelerated pace that reflects enthusiasm;
Emotion: contagious happiness and positivity;
Pronunciation: lively articulation, open vowels and highlighted syllables;
Pauses: brief and rhythmic to emphasize liveliness.
]]
        }
    }
}