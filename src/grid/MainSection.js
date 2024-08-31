import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Hand from '../components/Hand';
import Board from '../components/Board';

const MainSection = ({ gameState, handleAction }) => {
  const playerHandCards = gameState.players[0].hand.handCards;
  const opponentHandCards = gameState.players[1].hand.handCards;
  const cardPiles = gameState.board.cardPiles;

  const revealedPlayerCards = playerHandCards.filter(card => card.isRevealed);
  const unrevealedPlayerCards = playerHandCards.filter(card => !card.isRevealed);
  const revealedOpponentCards = opponentHandCards.filter(card => card.isRevealed);
  const unrevealedOpponentCards = opponentHandCards.filter(card => !card.isRevealed);
  
  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      minWidth: '300px',
      }}>
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
            <Hand gameState={gameState} handCards={unrevealedOpponentCards} />
          </Box>
        </Grid>
        {/* Row 2 */}
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgreen',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Hand gameState={gameState} handCards={revealedOpponentCards} />
          </Box>
        </Grid>
        {/* Row 3 */}
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
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
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '5%' }}>
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
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            
          </Box>
        </Grid>
        <Hand gameState={gameState} playerID={gameState.youPlayerID} handCards={revealedPlayerCards} handleAction={handleAction} />
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
          <Box
            sx={{
              backgroundColor: 'lightpink',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexGrow: 1, 
              overflow: 'auto', 
              minWidth: '300px'
            }}
          >
            <Hand gameState={gameState} playerID={gameState.youPlayerID} handCards={unrevealedPlayerCards} handleAction={handleAction} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSection;
