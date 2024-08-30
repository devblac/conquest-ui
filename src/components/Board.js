import React from 'react';
import Grid from '@mui/material/Grid2';
import CardPile from './CardPile';

const Board = ({ cardPiles }) => {
  return (
    <Grid container spacing={2}>
      {cardPiles.map((pile, index) => (
        <Grid item key={index}>
          <CardPile card={pile.card} count={pile.count} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
