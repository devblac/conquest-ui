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

        if (!action) {
          return null; // No action, no click event
        }
        if (canSelectCards(gameState) && toggleCardSelection) {
          return () => toggleCardSelection(handCard, findSelectCardsAction(gameState))
        }
        // if (!action) {
        //   console.error(`Action not found for index: ${index}`);
        //   return null;
        // };
        return () => {
            console.log('This is an action', action);
            console.log('Are we gonna keep this?', action);
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

const findActionByKinds = (gameState, kinds) => gameState.possibleActions.find(action => kinds.includes(action.kind));
const findSelectCardsAction = (gameState) => findActionByKinds(gameState, ["discard_cards", "trash_cards"]);
const canSelectCards = (gameState) => findSelectCardsAction(gameState) !== undefined;


export default Hand;
