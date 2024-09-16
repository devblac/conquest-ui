import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import Card from './Card';

const ConquestDialog = ({ 
  open, 
  dialogTitle, 
  happyButton, // Buttons have a `label` and a `handleAction`
  sadButton, 
  cards, // Pass either cards or handCards, but not both.
  handCards, 
  up_to_n, // Conditions for selecting cards
  exactly_n, 
  until_n_left, 
  setTrigger, // Pass React's re-render function, so that on card click, the state is updated.
  conquestDialogSelectedCards, // Pass the selected cards
  setConquestDialogSelectedCards, // Pass the function that updates the selected cards
  canSelectCards // If not passed or false, no cards can be selected
}) => {
  // Accept either cards or handCards
  let resolvedCards = cards;
  if (handCards) {
    resolvedCards = handCards.map(hc => hc.card);
  }

  // Add an index to each card (so that it can be used for selection)
  resolvedCards = resolvedCards.map((card, index) => ({
    ...card,
    index: index
  }));

  const toggleCardSelection = (card, {up_to_n, exactly_n, until_n_left}) => {
    // Only allow selecting cards if the game is in a state where you can select cards
    if (!canSelectCards) {
      return;
    }

    const isSelected = conquestDialogSelectedCards.map(hc => hc.index).includes(card.index);

    // If we're adding a card to selection, we need to honor the selection constraints
    if (!isSelected) {
      if (until_n_left) {
        exactly_n = resolvedCards.length - until_n_left;
      }
      if (up_to_n && conquestDialogSelectedCards.length >= up_to_n) {
        return;
      }
      if (exactly_n && conquestDialogSelectedCards.length >= exactly_n) {
        return;
      }
    }

    // Given an array of selected hand cards and a card,
    // create a new array with the card either added or removed,
    // depending on whether it's already in the array.
    const toggle = (prevSelected, card) => isSelected ?
        prevSelected.filter(hc => hc.index !== card.index) :
        [...prevSelected, card];

    // Update the selected cards in the manager, and trigger a re-render
    setTrigger(setConquestDialogSelectedCards(toggle(conquestDialogSelectedCards, card)));
  };
  
  return (
    <Modal
      open={open}
      onClose={sadButton ? sadButton.handleAction : undefined}
      aria-labelledby="conquest-dialog-title"
      aria-describedby="conquest-dialog-description"
      sx={{
        '& .MuiBox-root': {
          bgcolor: 'rgba(0, 0, 0, 0.8)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography id="moat-modal-title" variant="h6" component="h2" sx={{ color: 'white', mb: 2 }}>
          {dialogTitle}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {resolvedCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              displayName={card.displayName}
              cardType={card.cardType}
              isRevealed={true}
              handleAction={() => toggleCardSelection(card, {up_to_n, exactly_n, until_n_left})}
              isSelected={false}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {happyButton && <Button onClick={happyButton.handleAction} variant="contained" color="primary" sx={{ mr: 2 }}>
            {happyButton.label}
          </Button>}
          {sadButton && <Button onClick={sadButton.handleAction} variant="contained" color="secondary">
            {sadButton.label}
          </Button>}
        </Box>
      </Box>
    </Modal>
  );
};

export default ConquestDialog;
