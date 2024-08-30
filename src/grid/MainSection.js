import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Hand from '../components/Hand';
import Board from '../components/Board';

const MainSection = ({ gameState }) => {
  const playerHandCards = gameState.players[0].hand.handCards;
  const opponentHandCards = gameState.players[1].hand.handCards;
  const cardPiles = gameState.board.cardPiles;


  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        {/* Row 1 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightblue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Hand handCards={opponentHandCards} />
          </Box>
        </Grid>
        {/* Row 2 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgreen',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Row 2
          </Box>
        </Grid>
        {/* Row 3 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Board cardPiles={cardPiles} />
          </Box>
        </Grid>
        {/* Row 4 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightyellow',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Buttons
          </Box>
        </Grid>
        {/* Row 5 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Hand handCards={playerHandCards} />
          </Box>
        </Grid>
        {/* Row 6 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightpink',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            
          </Box>
        </Grid>
        {/* Row 7 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightcyan',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSection;
