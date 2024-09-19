import React from 'react';
import Grid from '@mui/material/Grid2';
import CardPile from './CardPile';
import Box from '@mui/material/Box';

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
    <Box>
      <Grid container columnSpacing={0} sx={{ marginBottom: '1vh' }}>
        <Grid item size='grow'></Grid>
        {actionCardPiles.slice(0, 5).map((pile, index) => (
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
        <Grid item size='grow'></Grid>
      </Grid>
      <Grid container columnSpacing={0} sx={{  }}>
        <Grid item size='grow'></Grid>
        {actionCardPiles.slice(5).map((pile, index) => (
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
        <Grid item size='grow'></Grid>
      </Grid>
    </Box>
  );
};

export default Board;
