import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import RoundLogItem from '../components/RoundLogItem';
import Typography from '@mui/material/Typography';

const RightColumn = ({ gameState, handleAction }) => {
  const { roundsLog } = gameState;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        {/* Top Row - 5% Height */}
        <Grid item sx={{ flexGrow: 1, height: '5%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightblue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {/* Top Row - 5% Height */}
          </Box>
        </Grid>
        {/* Middle Row - 90% Height */}
        <Grid item sx={{ flexGrow: 1, height: '70%' }}>
          <Box
            sx={{
              width: '95%', // Increased the width
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px',  // Center the box
      
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '8px', color: 'white' }}>
              Game Log
            </Typography>
            <Box
              sx={{
                width: '100%', // Increased the width
                height: '300px',
                overflowY: 'auto',
                backgroundColor: '#2a2a2a',  // Darker background color for better readability
                borderRadius: '16px',  // Rounded corners
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
                padding: '16px',  // Padding for internal spacing
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
      
      
            >
              {roundsLog.map((round, index) => (
                <RoundLogItem key={index} roundNumber={index + 1} actions={round.actions || []} />
              ))}
            </Box>
          </Box>
        </Grid>
        {/* Bottom Row - 5% Height */}
        <Grid item sx={{ flexGrow: 1, height: '5%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {/* Bottom Row - 5% Height */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RightColumn;
