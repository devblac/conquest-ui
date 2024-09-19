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
    <>
    {Array.from({ length: Math.ceil(treasureVictoryCardPiles.length / 2) }).map((_, rowIndex) => (
      <Grid container direction='row' key={rowIndex} sx={{ marginBottom: '0.2vh' }}>
        <Grid item size='grow'></Grid>
        {treasureVictoryCardPiles.slice(rowIndex * 2, rowIndex * 2 + 2).map((pile, index) => (
          <Grid item key={index}>
            <CardPile
              card={pile.card}
              count={pile.count}
              handleAction={resolveAction(pile.card.id, gameState.youPlayerID)}
              actionInProgress={actionInProgress}
              skeleton={miniCardSkeletons[pile.card.cardType]}
              gameState={gameState}
              isGainable={resolveGainAction(pile.card.id, gameState.youPlayerID) !== null}
            />
          </Grid>
        ))}
        <Grid item size='grow'></Grid>
      </Grid>
    ))}
    </>
  );
};

export default LeftBoard;
