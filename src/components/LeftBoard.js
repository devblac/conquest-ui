import React from 'react';
import Grid from '@mui/material/Grid2';
import CardPile from './CardPile';

const LeftBoard = ({ cardPiles }) => {
  const treasureVictoryCardPiles = cardPiles.filter(pile => 
    pile.card.cardType === 'treasure' || pile.card.cardType === 'victory'
  );

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {treasureVictoryCardPiles.map((pile, index) => (
        <Grid item key={index} xs={4} sm={3} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardPile card={pile.card} count={pile.count} />
        </Grid>
      ))}
    </Grid>
  );
};

export default LeftBoard;
