import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const PlayerInfo = ({ actions, buys, coins, victoryPoints }) => {
  return (
    <Box sx={{ padding: '16px', backgroundColor: 'lightgray', borderRadius: '8px' }}>
      <Typography variant="h6">Actions: {actions}</Typography>
      <Typography variant="h6">Buys: {buys}</Typography>
      <Typography variant="h6">Coins: {coins}</Typography>
      <Typography variant="h6">Victory Points: {victoryPoints}</Typography>
    </Box>
  );
};

export default PlayerInfo;