import React from 'react';
import Grid from '@mui/material/Grid2';
import Card from './Card';

const Hand = ({ gameState, playerID, handCards, handleAction, toggleCardSelection, selectedHandCards }) => {
  const resolveAction = (handCard, playerID) => {
        const index = handCard.index;
        const action = gameState.possibleActions.find(action =>
          action.playerID === playerID &&
          action.kind === "reveal_card" &&
          action.HandCard &&
          action.HandCard.index === index
        );
        if (canSelectCards(gameState) && toggleCardSelection) {
          return () => toggleCardSelection(handCard)
        }
        // if (!action) {
        //   console.error(`Action not found for index: ${index}`);
        //   return null;
        // };
        return () => {
            console.log('This is an action', action);
            handleAction(action);
        }
    }

    return (
    <Grid container spacing={1} sx={{ justifyContent: 'center', overflow: 'hidden' }}>
      {handCards.map((handCard) => (
        <Grid item key={handCard.index} sx={{ flexShrink: 0 }}>
          <Card 
            id={handCard.card.id}
            displayName={handCard.card.displayName}
            description={handCard.card.description}
            treasuresCost={handCard.card.treasuresCost}
            cardType={handCard.card.cardType}
            isRevealed={handCard.isRevealed}
            handleAction={resolveAction(handCard, playerID)}
            playerID={playerID}
            isSelected={(selectedHandCards || []).some(hc => hc.index === handCard.index)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const canSelectCards = (gameState) => {
  return gameState.possibleActions.some(action =>
    action.kind === "discard_cards" ||
    action.kind === "trash_cards"
  );
}

export default Hand;
