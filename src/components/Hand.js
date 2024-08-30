import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from './Card';

const Hand = ({ gameState, playerID, handCards, handleAction }) => {
    
    const resolveAction = (index, playerID) => {
        const action = gameState.possibleActions.find(action => action.playerID === playerID && action.kind === "reveal_card" && action.index === index);
        if (!action) return;
        return () => {
            console.log('action', action);
            handleAction(action);
        }
    }
    return (
    <Grid container spacing={1} sx={{ justifyContent: 'center', overflow: 'hidden' }}>
      {handCards.map((handCard, index) => (
        <Grid item key={index} sx={{ flexShrink: 0 }}>
          <Card 
            id={handCard.card.id}
            displayName={handCard.card.displayName}
            description={handCard.card.description}
            treasuresCost={handCard.card.treasuresCost}
            cardType={handCard.card.cardType}
            isRevealed={handCard.isRevealed}
            handleAction={resolveAction(index, playerID)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Hand;
