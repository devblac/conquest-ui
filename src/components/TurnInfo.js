import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const TurnInfo = ({ gameState, handleAction, roundNumber, turnPlayerID, turnPhase, selectedHandCards }) => {
  const endsBuysAction = gameState.possibleActions.find(action => action.kind === "end_buys" && action.playerID === gameState.youPlayerID);
  const endsActions = gameState.possibleActions.find(action => action.kind === "end_actions" && action.playerID === gameState.youPlayerID);
  const revealAllTreasuresAction = gameState.possibleActions.find(action => action.kind === "reveal_all_treasures" && action.playerID === gameState.youPlayerID);
  const discardCardsAction = getDiscardCardsAction(gameState, selectedHandCards);
  const trashCardsAction = getTrashCardsAction(gameState, selectedHandCards);
  return (
    <Box sx={{ 
      padding: '0.5vh',
      paddingLeft: '3vh',
      backgroundColor: 'black',
      borderRadius: '8px'
      }}>
      <Typography component="span" sx={{ color: 'white', fontSize: '2vh', paddingRight: '2vh' }}>{turnPlayerID === gameState.youPlayerID ? 'Your turn' : 'Their turn'}{turnPhase === 'buy' ? ' (buy phase)' : ' (action phase)'}</Typography>
      {endsBuysAction && <Button variant="outlined" sx={{ marginRight: '1vh' }} onClick={() => handleAction(endsBuysAction) }>End Buys</Button>}
      {endsActions && <Button variant="outlined" sx={{ marginRight: '1vh' }} onClick={() => handleAction(endsActions)}>End Actions</Button>}
      {discardCardsAction && <Button variant="outlined" sx={{ marginRight: '1vh' }} onClick={() => handleAction(discardCardsAction)}>Discard Cards</Button>}
      {trashCardsAction && <Button variant="outlined" sx={{ marginRight: '1vh' }} onClick={() => handleAction(trashCardsAction)}>Trash Cards</Button>}
      {revealAllTreasuresAction && <Button variant="outlined" sx={{ marginRight: '1vh' }} onClick={() => handleAction(revealAllTreasuresAction)}>Reveal All Treasures</Button>}
    </Box>
  );
};


const findActionByKind = (gameState, kind) => 
  gameState.possibleActions.find(action => action.kind === kind && action.playerID === gameState.youPlayerID);

const withHandCards = (action, handCards) => 
  action ? { 
    ...action, 
    hand_cards: handCards, // TODO backend has inconsistent casing so we put both in; fix this!
    handCards: handCards,
  } : undefined;

// The Discard/Trash buttons should only be enabled if the selected cards satisfy the constraints of the action.
// For example, if the action is "discard_cards up_to_n 3", then we should only enable the button if 3 or fewer cards are selected.
const satisfiesActionConstraints = (gameState, selectedHandCards, kind) => {
  const action = findActionByKind(gameState, kind);

  if (!action) {
    return false;
  }

  let {up_to_n, exactly_n, until_n_left} = action

  if (until_n_left) {
    exactly_n = gameState.players[gameState.turnPlayerID].hand.handCards.length - until_n_left;
  }
  if (up_to_n && selectedHandCards.length > up_to_n) {
    return;
  }
  if (exactly_n && selectedHandCards.length !== exactly_n) {
    return;
  }

  return true;
}

const getDiscardCardsAction = (gameState, selectedHandCards) => satisfiesActionConstraints(gameState, selectedHandCards, "discard_cards") ?
  withHandCards(findActionByKind(gameState, "discard_cards"), selectedHandCards) : undefined;

const getTrashCardsAction = (gameState, selectedHandCards) => satisfiesActionConstraints(gameState, selectedHandCards, "trash_cards") ?
  withHandCards(findActionByKind(gameState, "trash_cards"), selectedHandCards) : undefined;

export default TurnInfo;
