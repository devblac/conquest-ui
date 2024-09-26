import { useState, useEffect } from 'react';
// import { ActionButton } from '../ActionButtons';
// import Hand from './Hand';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LeftColumn from '../grid/LeftColumn';
import MainSection from '../grid/MainSection';
import RightColumn from '../grid/RightColumn';
import ConquestDialog from './ConquestDialog';

export const Game = ({ manager }) => {
  const [trigger, setTrigger] = useState(0);

  const selectedHandCards = manager.selectedHandCards;
  const gameState = manager.gameState;

  const toggleCardSelection = (handCard, {up_to_n, exactly_n, until_n_left}) => {
    console.log('toggleCardSelection', handCard, {up_to_n, exactly_n, until_n_left}, canSelectCards(gameState));
    // Only allow selecting cards if the game is in a state where you can select cards
    if (!canSelectCards(gameState)) {
      return;
    }

    const isSelected = selectedHandCards.map(hc => hc.index).includes(handCard.index);

    // If we're adding a card to selection, we need to honor the selection constraints
    if (!isSelected) {
      if (until_n_left) {
        exactly_n = gameState.players[gameState.turnPlayerID].hand.handCards.length - until_n_left;
      }
      if (up_to_n && selectedHandCards.length >= up_to_n) {
        return;
      }
      if (exactly_n && selectedHandCards.length >= exactly_n) {
        return;
      }
    }

    // Given an array of selected hand cards and a card,
    // create a new array with the card either added or removed,
    // depending on whether it's already in the array.
    const toggle = (prevSelected, handCard) => isSelected ?
        prevSelected.filter(hc => hc.index !== handCard.index) :
        [...prevSelected, handCard];

    // Update the selected hand cards in the manager, and trigger a re-render
    setTrigger(manager.setSelectedHandCards(toggle(selectedHandCards, handCard)));
  };

  const handleAction = action => {
    console.log('MainGame action', action);
    setTrigger(manager.runAction(action, setTrigger))
  }

  // Here I can check current gameState
  console.log('gameState ', gameState);
  
  useEffect(() => {
    if (gameState.isGameEnded) {
    }
  }, [gameState.isGameEnded]);

  useEffect(() => {
    manager.setRenderTrigger(setTrigger);
  }, []);

  if (!gameState || !gameState.players) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', height: '100vh', flexGrow: 1 }}>
      <Grid container spacing={0} columns={3} sx={{ height: '100%', width: '100%' }}>
        <Grid 
          item xs={4} md={4} sx={{ height: '100%', width: '20%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <LeftColumn gameState={gameState} handleAction={handleAction} selectedHandCards={selectedHandCards} />
        </Grid>
        <Grid
          item xs={4} sx={{ height: '100%', width: '60%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <MainSection gameState={gameState} handleAction={handleAction} selectedHandCards={selectedHandCards} toggleCardSelection={toggleCardSelection} />
        </Grid>
        <Grid
          item xs={4} sx={{ height: '100%', width: '20%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <RightColumn gameState={gameState} handleAction={handleAction} />

        </Grid>
        {/* Moat modal */}
        <ConquestDialog
          open={hasMoatActions(gameState)}
          dialogTitle="Use Moat?"
          happyButton={{ label: "Yes", handleAction: () => handleAction(yesAction(gameState)) }}
          sadButton={{ label: "No", handleAction: () => handleAction(noAction(gameState)) }}
          handCards={gameState.players[gameState.youPlayerID].hand.handCards.filter(handCard => handCard.card.id === "moat")}
          setTrigger={setTrigger}
          gameState={gameState}
        />
        {/* Library modal */}
        <ConquestDialog
          open={hasActionsOfKinds(gameState, ["keep_card"])}
          dialogTitle="Keep this action card?"
          happyButton={{ label: "Yes", handleAction: () => handleAction(keepAction(gameState, true)) }}
          sadButton={{ label: "No", handleAction: () => handleAction(keepAction(gameState, false)) }}
          handCards={keepAction(gameState, true).hand_card ? [keepAction(gameState, true).hand_card] : []}
          setTrigger={setTrigger}
          gameState={gameState}
        />
        {/* Bandit modal */}
        <ConquestDialog
          open={hasActionsOfKinds(gameState, ["discard_and_trash_cards"])}
          dialogTitle="Choose which treasure card to trash"
          happyButton={{ label: "Trash selected", handleAction: () => {
            if (manager.conquestDialogSelectedCards.length !== 1) {
              return;
            }
            const selectedHandCard = manager.conquestDialogSelectedCards[0];
            const action = getActionOfKinds(gameState, ["discard_and_trash_cards"])  
            const handCards = [action.discard_hand_card, action.trash_hand_card];
            const trashHandCard = handCards.find(hc => hc.card.index === selectedHandCard.index);
            const discardHandCard = handCards.find(hc => hc.card.index !== selectedHandCard.index);
              handleAction(discardAndTrashCardsAction(gameState, discardHandCard, trashHandCard)) 
            }
          }}
          handCards={
            (() => {
              const action = getActionOfKinds(gameState, ["discard_and_trash_cards"]);
              return action ? [action.discard_hand_card, action.trash_hand_card] : [];
            })()
          }
          setTrigger={setTrigger}
          canSelectCards={true}
          exactly_n={1}
          conquestDialogSelectedCards={manager.conquestDialogSelectedCards}
          setConquestDialogSelectedCards={(cs) => manager.setConquestDialogSelectedCards(cs)}
          gameState={gameState}
        />
        {/* Vassal modal */}
        <ConquestDialog
          open={hasVassalActions(gameState)}
          dialogTitle="Play this action card?"
          happyButton={{ label: "Yes", handleAction: () => handleAction(getActionOfKinds(gameState, ['yes'])) }}
          sadButton={{ label: "No", handleAction: () => handleAction(getActionOfKinds(gameState, ['no'])) }}
          handCards={[gameState.players[gameState.youPlayerID].hand.handCards[gameState.players[gameState.youPlayerID].hand.handCards.length - 1]]}
          setTrigger={setTrigger}
          gameState={gameState}
        />
        {/* Harbinger modal */}
        <ConquestDialog
          open={hasActionsOfKinds(gameState, ['move_discarded_to_deck'])}
          dialogTitle="Which card do you want to topdeck?"
          happyButton={{ label: "Topdeck", handleAction: () => handleAction(moveDiscardedToDeckAction(gameState, manager.conquestDialogSelectedCards[0])) }}
          // TODO: Harbinger has no way to not topdeck
          // sadButton={{ label: "Don't Topdeck", action: () => handleAction(getActionOfKinds(gameState, ['move_discarded_to_deck'])) }}
          cards={gameState.players[gameState.youPlayerID].discardPile.cards}
          setTrigger={setTrigger}
          canSelectCards={true}
          exactly_n={1}
          conquestDialogSelectedCards={manager.conquestDialogSelectedCards}
          setConquestDialogSelectedCards={(cs) => manager.setConquestDialogSelectedCards(cs)}
          gameState={gameState}
        />
        {/* Sentry modal (trash cards) */}
        <ConquestDialog
          open={gameState.actionInProgress && gameState.actionInProgress.state === 'state_sentry_trash_cards'}
          dialogTitle="Select cards to trash"
          happyButton={{ label: "Trash", handleAction: () => handleAction(getActionOfKinds(gameState, ['trash_cards'])) }}
          handCards={gameState.players[gameState.youPlayerID].hand.handCards.slice(-2)}
          setTrigger={setTrigger}
          canSelectCards={true}
          up_to_n={2}
          conquestDialogSelectedCards={manager.conquestDialogSelectedCards}
          setConquestDialogSelectedCards={(cs) => manager.setConquestDialogSelectedCards(cs)}
          gameState={gameState}
        />
        {/* Sentry modal (discard cards) */}
        <ConquestDialog
          open={gameState.actionInProgress && gameState.actionInProgress.state === 'state_sentry_discard_cards'}
          dialogTitle="Select cards to discard"
          happyButton={{ label: "Discard", handleAction: () => handleAction(getActionOfKinds(gameState, ['discard_cards'])) }}
          handCards={gameState.players[gameState.youPlayerID].hand.handCards.slice(-2)}
          setTrigger={setTrigger}
          canSelectCards={true}
          up_to_n={2}
          conquestDialogSelectedCards={manager.conquestDialogSelectedCards}
          setConquestDialogSelectedCards={(cs) => manager.setConquestDialogSelectedCards(cs)}
          gameState={gameState}
        />
        {/* Sentry modal (reorder cards) */}
        <ConquestDialog
          open={gameState.actionInProgress && gameState.actionInProgress.state === 'state_sentry_reorder_cards'}
          dialogTitle="Reorder cards"
          happyButton={{ label: "Reorder", handleAction: () => handleAction(getActionOfKinds(gameState, ['discard_cards'])) }}
          handCards={gameState.players[gameState.youPlayerID].hand.handCards.slice(-2)}
          setTrigger={setTrigger}
          enableReorder={false}
          gameState={gameState}
        />
      </Grid>
    </Box>
  );
}

const canSelectCards = (gameState) => {
  return gameState.possibleActions.some(action =>
    action.kind === "discard_cards" ||
    action.kind === "trash_cards"
  );
}

const hasActionsOfKinds = (gameState, kinds) => {
  return gameState.possibleActions.some(action => kinds.includes(action.kind));
}

const getActionOfKinds = (gameState, kinds) => {
  return gameState.possibleActions.find(action => kinds.includes(action.kind));
}

function hasMoatActions(gameState) {
  return gameState.possibleActions.some(action => action.kind === "yes" && action.context === "uses moat") &&
    gameState.possibleActions.some(action => action.kind === "no");
}

function hasVassalActions(gameState) {
  return gameState.possibleActions.some(action => action.kind === "yes" && action.context === "plays action card") &&
    gameState.possibleActions.some(action => action.kind === "no");
}

function yesAction(gameState) {
  return gameState.possibleActions.find(action => action.kind === "yes");
}

function noAction(gameState) {
  return gameState.possibleActions.find(action => action.kind === "no");
}

function keepAction(gameState, withKeepValue) {
  const action = gameState.possibleActions.find(action => action.kind === "keep_card");
  if (!action) {
    return {};
  }
  action.keep = withKeepValue;
  return action;
}

function discardAndTrashCardsAction(gameState, withDiscardHandCard, withTrashHandCard) {
  const action = gameState.possibleActions.find(action => action.kind === "discard_and_trash_cards");
  if (!action) {
    return {};
  }
  action.discard_hand_card = withDiscardHandCard;
  action.trash_hand_card = withTrashHandCard;
  return action;
}

function moveDiscardedToDeckAction(gameState, withCard) {
  const action = gameState.possibleActions.find(action => action.kind === "move_discarded_to_deck");
  if (!action) {
    return {};
  }
  action.card = withCard;
  return action;
}