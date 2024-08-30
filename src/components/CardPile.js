import React from 'react';
import Box from '@mui/material/Box';
import Card from './Card';

const CardPile = ({ card, count }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Card 
        id={card.id}
        displayName={card.displayName}
        description={card.description}
        treasuresCost={card.treasuresCost}
        cardType={card.cardType}
        isRevealed={true}
      />
      <Box sx={{ marginTop: '8px' }}>
        <strong>Remaining: {count}</strong>
      </Box>
    </Box>
  );
};

export default CardPile;
