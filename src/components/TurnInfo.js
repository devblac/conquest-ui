import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TurnInfo = ({ gameState, handleAction, roundNumber, turnPlayerID, turnPhase, selectedHandCards }) => {
  const endsBuysAction = gameState.possibleActions.find(action => action.kind === "end_buys");
  const endsActions = gameState.possibleActions.find(action => action.kind === "end_actions");
  const revealAllTreasuresAction = gameState.possibleActions.find(action => action.kind === "reveal_all_treasures");
  const discardCardsAction = getDiscardCardsAction(gameState, selectedHandCards);
  const trashCardsAction = getTrashCardsAction(gameState, selectedHandCards);
  return (
    <Box sx={{ 
      padding: '8px',
      backgroundColor: 'lightblue',
      borderRadius: '8px'
      }}>
      {endsBuysAction && <Button variant="outlined" onClick={() => handleAction(endsBuysAction) }>End Buys</Button>}
      {endsActions && <Button variant="outlined" onClick={() => handleAction(endsActions)}>End Actions</Button>}
      {discardCardsAction && <Button variant="outlined" onClick={() => handleAction(discardCardsAction)}>Discard Cards</Button>}
      {trashCardsAction && <Button variant="outlined" onClick={() => handleAction(trashCardsAction)}>Trash Cards</Button>}
      {revealAllTreasuresAction && <Button variant="outlined" onClick={() => handleAction(revealAllTreasuresAction)}>Reveal All Treasures</Button>}
      <Typography variant="h6">Round: {roundNumber}</Typography>
      <Typography variant="h6">Current Player: {turnPlayerID}</Typography>
      <Typography variant="h6">Phase: {turnPhase}</Typography>
    </Box>
  );
};


const findActionByKind = (gameState, kind) => 
  gameState.possibleActions.find(action => action.kind === kind);

const withHandCards = (action, handCards) => 
  action ? { 
    ...action, 
    hand_cards: handCards, // TODO backend has inconsistent casing so we put both in; fix this!
    handCards: handCards,
  } : undefined;

const getDiscardCardsAction = (gameState, selectedHandCards) =>
  withHandCards(findActionByKind(gameState, "discard_cards"), selectedHandCards);

const getTrashCardsAction = (gameState, selectedHandCards) =>
  withHandCards(findActionByKind(gameState, "trash_cards"), selectedHandCards);

export default TurnInfo;
