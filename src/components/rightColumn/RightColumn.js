import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

const RightColumn = () => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        {/* Top Row - 25% Height */}
        <Grid item sx={{ flexGrow: 1, height: '25%' }}>
          <Box
            sx={{
              backgroundColor: 'lightblue',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Top Row (25%)
          </Box>
        </Grid>
        {/* Middle Row - 70% Height */}
        <Grid item sx={{ flexGrow: 1, height: '70%' }}>
          <Box
            sx={{
              backgroundColor: 'lightgreen',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Middle Row (70%)
          </Box>
        </Grid>
        {/* Bottom Row - 5% Height */}
        <Grid item sx={{ flexGrow: 1, height: '5%' }}>
          <Box
            sx={{
              backgroundColor: 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            Bottom Row (5%)
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RightColumn;
