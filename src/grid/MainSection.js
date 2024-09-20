import { React, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Hand from '../components/Hand';
import Board from '../components/Board';
import Button from '@mui/material/Button';
import TurnInfo from '../components/TurnInfo';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const actionIcons = {
  end_actions: <PlayArrowIcon />,
  end_buys: <PlayArrowIcon />,
  reveal_all_treasures: <VisibilityIcon />,
  resign: <ExitToAppIcon />,
};

const MainSection = ({ gameState, handleAction, selectedHandCards, toggleCardSelection }) => {
  const playerHandCards = gameState.players[gameState.youPlayerID].hand.handCards;
  const opponentHandCards = gameState.players[gameState.opponentPlayerID].hand.handCards;
  const cardPiles = gameState.board.cardPiles;


  const revealedPlayerCards = playerHandCards.filter(card => card.isRevealed);
  const unrevealedPlayerCards = playerHandCards.filter(card => !card.isRevealed);
  const revealedOpponentCards = opponentHandCards.filter(card => card.isRevealed);
  const unrevealedOpponentCards = opponentHandCards.filter(card => !card.isRevealed);
  
  const filteredActions = gameState.possibleActions.filter(action =>
  {
    const isValidAction = ['end_actions', 'end_buys', 'reveal_all_treasures', 'resign'].includes(action.kind) && action.playerID === gameState.youPlayerID;
    if (!action.HandCard || !action.HandCard.card) {
        // console.error('Action missing HandCard or card data:', action);
        return false; // Skip actions that are missing essential data
    }
    return isValidAction;

  }
  );


  useEffect(() => {
    console.log('Possible actions:', gameState.possibleActions);
  }, [gameState.possibleActions]);

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      minWidth: '300px',
      }}>
      <Grid container direction="column" sx={{ height: '100%' }}>
        {/* Row 1 */}
        <Grid item sx={{ flexGrow: 1, minHeight: '10%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightblue',
              marginTop: '-10vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Hand gameState={gameState} handCards={unrevealedOpponentCards} />
          </Box>
        </Grid>
        {/* Row 2 */}
        {gameState.turnPlayerID !== gameState.youPlayerID && (
          <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
            <Box
              sx={{
                // backgroundColor: 'lightgreen',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Hand gameState={gameState} handCards={revealedOpponentCards} />
            </Box>
          </Grid>
        )}
        {/* Row 3 */}
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightcoral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Board cardPiles={cardPiles} gameState={gameState} handleAction={handleAction}/>
          </Box>
        </Grid>
        {/* Row 4 */}
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '5%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightyellow',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {filteredActions.map(action => (
                <Button 
                key={action.kind} 
              onClick={() => handleAction(action)} 
              variant="contained" 
              color="primary"
              sx={{
                padding: '8px 16px',
                margin: '10px',
                borderRadius: '8px',
                fontSize: '14px',
                textTransform: 'none',  // Ensures the text is not all-uppercase
                display: 'flex',
                alignItems: 'center',
              }}
              startIcon={actionIcons[action.kind]}
                >
                  {action.kind.replace(/_/g, ' ')}
                </Button>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Row 5 */}
        {gameState.turnPlayerID === gameState.youPlayerID && (
          <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
            <Box
              sx={{
                // backgroundColor: 'lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Hand gameState={gameState} playerID={gameState.youPlayerID} handCards={revealedPlayerCards} handleAction={handleAction} />
            </Box>
          </Grid>
        )}
        
        <TurnInfo 
          gameState={gameState}
          handleAction={handleAction}
          roundNumber={gameState.roundNumber}
          turnPlayerID={gameState.turnPlayerID}
          turnPhase={gameState.turnPhase}
          selectedHandCards={selectedHandCards}
        />
        <Grid item sx={{ flexGrow: 1, overflow: 'auto', minWidth: '300px', minHeight: '10%' }}>
          <Box
            sx={{
              // backgroundColor: 'lightpink',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              flexGrow: 1, 
              overflow: 'auto', 
              minWidth: '300px'
            }}
          >
            <Hand gameState={gameState} playerID={gameState.youPlayerID} handCards={unrevealedPlayerCards} handleAction={handleAction} toggleCardSelection={toggleCardSelection} selectedHandCards={selectedHandCards} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainSection;
