import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from './Card';

const Hand = ({ handCards }) => {
  return (
    <Grid container spacing={1}>
      {handCards.map((handCard, index) => (
        <Grid item key={index}>
          <Card 
            id={handCard.card.id}
            displayName={handCard.card.displayName}
            description={handCard.card.description}
            treasuresCost={handCard.card.treasuresCost}
            cardType={handCard.card.cardType}
            isRevealed={handCard.isRevealed}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Hand;
