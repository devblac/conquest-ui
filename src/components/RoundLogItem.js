import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

const isImportantAction = (actionKind) => {
    const importantActions = ['buy_card', 'gain_card', 'play_action', 'end_turn'];
    return importantActions.includes(actionKind);
  };

  const RoundLogItem = ({ roundNumber, actions }) => {
    const playerActions = actions.filter(action => action.playerID === 0);
  const opponentActions = actions.filter(action => action.playerID === 1);

    return (
        <Box sx={{ padding: '12px', borderBottom: '1px solid lightgray', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'lightblue', marginBottom: '4px' }}>
        Round {roundNumber}
      </Typography>

      {/* Player's Actions */}
      {playerActions.length > 0 && (
        <>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white', marginTop: '8px' }}>
            You:
          </Typography>
          {playerActions.map((action, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: 'lightgray',
                fontWeight: 'normal',
                marginLeft: '10px',
              }}
            >
              {action.kind.replace(/_/g, ' ')}
              {action.kind === 'reveal_card' && ` - revealed ${action.card.displayName}`}
              {action.kind === 'buy_card' && ` - bought ${action.card.displayName}`}
            </Typography>
          ))}
        </>
      )}

      {/* Opponent's Actions */}
      {opponentActions.length > 0 && (
        <>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white', marginTop: '8px' }}>
            Opponent:
          </Typography>
          {opponentActions.map((action, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                color: 'lightgray',
                fontWeight: 'normal',
                marginLeft: '10px',
              }}
            >
              {action.kind.replace(/_/g, ' ')}
              {action.kind === 'reveal_card' && ` - revealed ${action.card.displayName}`}
              {action.kind === 'buy_card' && ` - bought ${action.card.displayName}`}
            </Typography>
          ))}
        </>
      )}
    </Box>
    );
  };

export default RoundLogItem;
