import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PlayerInfo from '../components/PlayerInfo';
import LeftBoard from '../components/LeftBoard';

const LeftColumn = ({ gameState }) => {
  const cardPiles = gameState.board.cardPiles;
  const playerInfo = gameState.players[0];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        {/* First Row */}
        <Grid item sx={{ height: '20%' }}>
          <Box
            sx={{
              backgroundColor: 'lightblue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Top Row (20%)
          </Box>
        </Grid>
        {/* Second Row */}
        <Grid item sx={{ height: '60%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgreen',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <LeftBoard cardPiles={cardPiles} />
          </Box>
        </Grid>
        {/* Third Row */}
        <Grid item sx={{ height: '20%' }}>
          <Box
            sx={{
              backgroundColor: 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <PlayerInfo 
              actions={playerInfo.actions} 
              buys={playerInfo.buys} 
              coins={playerInfo.coins} 
              victoryPoints={playerInfo.victoryPoints} 
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeftColumn;
