import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const MoatModal = ({ open, yesAction, noAction }) => {
  return (
    <Modal
      open={open}
      onClose={noAction}
      aria-labelledby="moat-modal-title"
      aria-describedby="moat-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/moat.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography id="moat-modal-title" variant="h6" component="h2" sx={{ color: 'white', mb: 2 }}>
          Use Moat?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button onClick={yesAction} variant="contained" color="primary" sx={{ mr: 2 }}>
            Yes
          </Button>
          <Button onClick={noAction} variant="contained" color="secondary">
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MoatModal;
