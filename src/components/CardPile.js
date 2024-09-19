import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from './Card';

const CardPile = ({ card, count, handleAction, actionInProgress, isGainable, gameState }) => {
  return (
    <Box sx={{
        width: '100px',
        height: '150px',
        borderRadius: '8px',
        backgroundColor: 'white',
        // backgroundColor: 'rgba(255, 255, 255, 0.6)', 
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        textAlign: 'center',
        margin: 'auto',
      }}
      >
      <Card 
        id={card.id}
        displayName={card.displayName}
        description={card.description}
        treasuresCost={card.treasuresCost}
        cardType={card.cardType}
        isRevealed={true}
        handleAction={handleAction}
        actionInProgress={actionInProgress}
        remainingCount={count}
        isGainable={isGainable}
        gameState={gameState}
      />
      <Typography variant="body2" sx={{ marginTop: '8px', color: 'black' }}>
        Remaining: {count}
      </Typography>
    </Box>
  );
};

export default CardPile;
