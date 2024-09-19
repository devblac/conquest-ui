import React from 'react';
import Grid from '@mui/material/Grid2';
import CardPile from './CardPile';

const Board = ({ gameState, cardPiles, handleAction }) => {
    const actionCardPiles = cardPiles.filter(pile => pile.card.cardType === 'action');

    const resolveBuyAction = (cardId, playerID) => {
      const action = gameState.possibleActions.find(action => 
        action.kind === 'buy_card' && 
        action.card.id === cardId && 
        action.playerID === playerID
      );
      if (!action) return null;
      return () => {
        console.log('Buy action:', action);
        handleAction(action);
      };
    };

    const resolveGainAction = (cardId, playerID) => {
      const action = gameState.possibleActions.find(action => 
        action.kind === 'gain_card' && 
        action.card.id === cardId && 
        action.playerID === playerID
      );
      if (!action) return null;
      return () => {
        console.log('Gain action:', action);
        handleAction(action);
      };
    };

    const resolveAction = (cardId, playerID) => {
      const buyAction = resolveBuyAction(cardId, playerID);
      if (buyAction) return buyAction;
      
      const gainAction = resolveGainAction(cardId, playerID);
      if (gainAction) return gainAction;
      
      return null;
    };

    return (
    <Grid container spacing={2} xs={4} sm={3} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
      {actionCardPiles.map((pile, index) => (
        <Grid item key={index}>
          <CardPile
            id={pile.card.id}
            displayName={pile.card.displayName}
            cardType={pile.card.cardType}
            treasuresCost={pile.card.treasuresCost}
            description={pile.card.description}
            card={pile.card}
            count={pile.count} 
            handleAction={resolveAction(pile.card.id, gameState.youPlayerID)}
            playerID={gameState.youPlayerID}
            isGainable={resolveGainAction(pile.card.id, gameState.youPlayerID) !== null}
            gameState={gameState}
            />
        </Grid>
      ))}
    </Grid>
  );
};

export default Board;
