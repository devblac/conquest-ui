import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import RoundLogItem from '../components/RoundLogItem';
import Typography from '@mui/material/Typography';

const RightColumn = ({ gameState, handleAction }) => {
  const { roundsLog } = gameState;

  return (
    <Box sx={{ width: '100%', height: '100%', margin: '0' }}>
      <Grid container direction="column" sx={{ height: '100%', margin: '0' }}>
        <Grid item sx={{ flexGrow: 1, height: '100%' }}>
          <Box
            sx={{
              width: '100%', // Increased the width
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >

            <Box
              sx={{
                width: '100%', // Increased the width
                height: '100%',
                opacity: '0.8',
                overflowY: 'auto',
                backgroundColor: 'black',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
                padding: '16px',  // Padding for internal spacing
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
      
      
            >
              <Typography variant="h6" sx={{ marginBottom: '8px', color: 'white' }}>
                Game Log
              </Typography>
              {roundsLog.map((round, index) => (
                <RoundLogItem key={index} roundNumber={index + 1} actions={round.actions || []} />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RightColumn;
