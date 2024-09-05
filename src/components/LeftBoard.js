import React from 'react';
import Grid from '@mui/material/Grid2';
import CardPile from './CardPile';
import { miniCardSkeletons } from '../utils/CardsSkeletons';

const LeftBoard = ({ cardPiles, gameState, handleAction, actionInProgress }) => {
  const treasureVictoryCardPiles = cardPiles.filter(pile => 
    pile.card.cardType === 'treasure' || pile.card.cardType === 'victory'
  );
  

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

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {treasureVictoryCardPiles.map((pile, index) => (
        <Grid item key={index} xs={4} sm={3} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardPile
            card={pile.card}
            count={pile.count}
            handleAction={resolveBuyAction(pile.card.id, gameState.youPlayerID)}
            actionInProgress={actionInProgress}
            skeleton={miniCardSkeletons[pile.card.cardType]}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default LeftBoard;
