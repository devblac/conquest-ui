import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PlayerInfo from '../components/PlayerInfo';
import LeftBoard from '../components/LeftBoard';

const LeftColumn = ({ gameState, handleAction, selectedHandCards }) => {
  const cardPiles = gameState.board.cardPiles;
  const themPlayer = gameState.players[gameState.opponentPlayerID];
  const youPlayer = gameState.players[gameState.youPlayerID];
  const actionInProgress = gameState.actionInProgress;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        {/* First Row */}
        <Grid item sx={{ height: '10%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightblue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <PlayerInfo 
              player={themPlayer}
            />
          </Box>
        </Grid>
        {/* Second Row */}
        <Grid item sx={{ height: '80%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightgreen',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <LeftBoard cardPiles={cardPiles} gameState={gameState} handleAction={handleAction} actionInProgress={actionInProgress} />
          </Box>
        </Grid>
        {/* Third Row */}
        <Grid item sx={{ height: '10%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <PlayerInfo 
              player={youPlayer}
            />

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeftColumn;
