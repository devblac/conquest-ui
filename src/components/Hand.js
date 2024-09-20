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
          return () => toggleCardSelection(handCard, findSelectCardsAction(gameState))
        }

        return () => {
            console.log('This is an action', action);
            console.log('Are we gonna keep this?', action);
            handleAction(action);
        }
    }

    const marginLeft = handCards.length <= 5 ? 0 : -(handCards.length - 5);

    return (
    <Grid container sx={{ justifyContent: 'center', overflow: 'hidden' }}>
      {handCards.map((handCard, i) => (
        <Grid item key={handCard.index} sx={{ flexShrink: 0, marginLeft: `${i === 0 ? 0 : marginLeft}vh` }}>
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
            gameState={gameState}
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
