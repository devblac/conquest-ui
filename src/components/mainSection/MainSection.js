import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

const MainSection = () => {
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
            Row 1
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
            Row 3
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
            Row 4
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
            Row 5
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
            Row 6
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
            Row 7
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSection;
