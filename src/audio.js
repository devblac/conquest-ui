export const GAME_OVER = 'game-over';
export const PING = 'ping';
export const WIN = 'win';
export const YOUR_TURN = 'your-turn';

const audioMap = {
    [GAME_OVER]: `${process.env.PUBLIC_URL}/audio/game-over.mp3`,
    [PING]: `${process.env.PUBLIC_URL}/audio/ping.mp3`,
    [WIN]: `${process.env.PUBLIC_URL}/audio/win.mp3`,
    [YOUR_TURN]: `${process.env.PUBLIC_URL}/audio/your-turn.mp3`,
};

export const playAudio = (audioId) => {
  if (audioMap[audioId]) {
    const audio = new Audio(audioMap[audioId]);
    audio.volume = 1;
    audio.play().catch(error => console.error('Error playing audio:', error));
  } else {
    console.warn(`Audio with id "${audioId}" not found in audioMap.`);
  }
};

