import React from 'react';
import Grid from '@mui/material/Grid2';
import CardPile from './CardPile';

const Board = ({ cardPiles }) => {
    const actionCardPiles = cardPiles.filter(pile => pile.card.cardType === 'action');
    return (
    <Grid container spacing={2} xs={4} sm={3} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
      {actionCardPiles.map((pile, index) => (
        <Grid item key={index}>
          <CardPile card={pile.card} count={pile.count} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
