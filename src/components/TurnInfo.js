import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TurnInfo = ({ roundNumber, turnPlayerID, turnPhase }) => {
  return (
    <Box sx={{ padding: '8px', backgroundColor: 'lightblue', borderRadius: '8px' }}>
      <Typography variant="h6">Round: {roundNumber}</Typography>
      <Typography variant="h6">Current Player: {turnPlayerID}</Typography>
      <Typography variant="h6">Phase: {turnPhase}</Typography>
    </Box>
  );
};

export default TurnInfo;
