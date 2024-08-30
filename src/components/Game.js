import { useState, useEffect } from 'react';
// import { ActionButton } from '../ActionButtons';
// import Hand from './Hand';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LeftColumn from './leftColumn/LeftColumn';
import MainSection from './mainSection/MainSection';
import RightColumn from './rightColumn/RightColumn';

export const Game = ({ manager }) => {
  const [trigger, setTrigger] = useState(0);

  const handleAction = action => {
    setTrigger(manager.runAction(action, setTrigger))
  }

  const gameState = manager.gameState;
  // Here I can check current gameState
  console.error('gameState ', gameState);
  
  useEffect(() => {
    if (gameState.isGameEnded) {
    }
  }, [gameState.isGameEnded]);

  useEffect(() => {
    if (gameState.possibleActions.length === 1 && gameState.possibleActions[0].name === "confirm_round_finished" && !gameState.isGameEnded) {
      // This is because the bot has to confirm the round finished too, or possibly reveal envido score too.
      // Either it did, and then this should be a no-op, or it didn't and this is useful.
      // This action produces no sounds or visual changes so we just run the action alone.
      manager.runBotAction();
      manager.runBotAction();

      const modalOverlay = document.getElementById('roundOverModalOverlay');
      modalOverlay.classList.add('show');
    }
  }, [gameState]);

  return (
    <Box sx={{ width: '100%', height: '100vh', flexGrow: 1 }}>
      <Grid container spacing={0} columns={3} sx={{ height: '100%', width: '100%' }}>
        <Grid 
          item xs={4} md={4} sx={{ height: '100%', width: '30%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <LeftColumn />
        </Grid>
        <Grid 
          item xs={4} sx={{ height: '100%', width: '30%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <MainSection />
        </Grid>
        <Grid 
          item xs={4} sx={{ height: '100%', width: '30%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <RightColumn />
        </Grid>
      </Grid>
    </Box>
  );
}
