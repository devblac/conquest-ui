import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

const PlayerInfo = ({ player }) => {
  console.log({player});
  return (
    <Grid container sx={{ padding: '1vh', backgroundColor: 'black', width: '35vh', fontWeight: 'bolder' }}>
      <Grid item size={8} sx={{ color: 'white' }}>
        <Typography sx={{ fontSize: '2.5vh' }}>{player.id === 0 ? 'You' : 'They'}</Typography>
      </Grid>
      <Grid item size={4} sx={{ color: '#00FF00', textAlign: 'right' }}>
        <Typography sx={{ fontSize: '2.5vh' }}>{player.victoryPoints} VP</Typography>
      </Grid>
    </Grid>

  );
};

export default PlayerInfo;