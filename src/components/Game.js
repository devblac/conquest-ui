import { useState, useEffect } from 'react';
// import { ActionButton } from '../ActionButtons';
// import Hand from './Hand';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LeftColumn from '../grid/LeftColumn';
import MainSection from '../grid/MainSection';
import RightColumn from '../grid/RightColumn';
import MoatModal from './MoatModal';
import ConquestDialog from './ConquestDialog';

export const Game = ({ manager }) => {
  const [trigger, setTrigger] = useState(0);

  const selectedHandCards = manager.selectedHandCards;
  const gameState = manager.gameState;

  const toggleCardSelection = (handCard, {up_to_n, exactly_n, until_n_left}) => {
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
    if (gameState.possibleActions.length === 1 && gameState.possibleActions[0].name === "confirm_round_finished" && !gameState.isGameEnded) {
      // This is because the bot has to confirm the round finished too, or possibly reveal envido score too.
      // Either it did, and then this should be a no-op, or it didn't and this is useful.
      // This action produces no sounds or visual changes so we just run the action alone.
      manager.runBotAction();
      manager.runBotAction();

      const modalOverlay = document.getElementById('roundOverModalOverlay');
      modalOverlay.classList.add('show');
    }
  }, [gameState]);

  return (
    <Box sx={{ width: '100%', height: '100vh', flexGrow: 1 }}>
      <Grid container spacing={0} columns={3} sx={{ height: '100%', width: '100%' }}>
        <Grid 
          item xs={4} md={4} sx={{ height: '100%', width: '30%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <LeftColumn gameState={gameState} handleAction={handleAction} selectedHandCards={selectedHandCards} />
        </Grid>
        <Grid
          item xs={4} sx={{ height: '100%', width: '40%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <MainSection gameState={gameState} handleAction={handleAction} selectedHandCards={selectedHandCards} toggleCardSelection={toggleCardSelection} />
        </Grid>
        <Grid
          item xs={4} sx={{ height: '100%', width: '30%' }}
          display="flex" justifyContent="center" alignItems="center"
        >
          <RightColumn gameState={gameState} handleAction={handleAction} />

        </Grid>
        <MoatModal 
          open={hasMoatActions(gameState)}
          yesAction={() => handleAction(yesAction(gameState))}
          noAction={() => handleAction(noAction(gameState))}
        />
        <ConquestDialog
          open={true}
          dialogTitle="Conquest Modal Example"
          happyButton={{ label: "Yes", action: () => console.log("Yes") }}
          sadButton={{ label: "No", action: () => console.log("No") }}
          cards={null}
          handCards={gameState.players[gameState.youPlayerID].hand.handCards}
          up_to_n={1}
          setTrigger={setTrigger}
          conquestDialogSelectedCards={manager.conquestDialogSelectedCards}
          setConquestDialogSelectedCards={(cs) => manager.conquestDialogSelectedCards = cs }
          canSelectCards={true}
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

function hasMoatActions(gameState) {
  // At the moment, yes/no is only for Moat, so let's just check for that.
  return gameState.possibleActions.some(action => action.kind === "yes") &&
    gameState.possibleActions.some(action => action.kind === "no");
}

function yesAction(gameState) {
  return gameState.possibleActions.find(action => action.kind === "yes");
}

function noAction(gameState) {
  return gameState.possibleActions.find(action => action.kind === "no");
}
