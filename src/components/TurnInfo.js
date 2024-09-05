import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TurnInfo = ({ gameState, handleAction, roundNumber, turnPlayerID, turnPhase }) => {
  const endsBuysAction = gameState.possibleActions.find(action => action.kind === "end_buys");
  const endsActions = gameState.possibleActions.find(action => action.kind === "end_actions");
  return (
    <Box sx={{ 
      padding: '8px',
      backgroundColor: 'lightblue',
      borderRadius: '8px'
      }}>
      {endsBuysAction && <Button handleAction={() => handleAction(endsBuysAction) } />}
      {endsActions && <Button handleAction={() => handleAction(endsActions)} />}
      <Typography variant="h6">Round: {roundNumber}</Typography>
      <Typography variant="h6">Current Player: {turnPlayerID}</Typography>
      <Typography variant="h6">Phase: {turnPhase}</Typography>
    </Box>
  );
};

export default TurnInfo;
