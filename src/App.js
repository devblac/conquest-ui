import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { SinglePlayerGameStateManager } from './singlePlayerGameStateManager';
import { MultiplayerGameStateManager } from './multiplayerGameStateManager';
import { ActionButton } from './ActionButtons';
import { Game } from './components/Game';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

const App = () => {
  return <GameLandingPage />;
};

export default App;


export const startGame = ({serverURL, playerID}) => {
  document.getElementById("startGame").remove();
  const root = createRoot(document.getElementById("game"));
  const manager = serverURL ? new MultiplayerGameStateManager({serverURL, playerID}) : new SinglePlayerGameStateManager();
  manager.start({});

  root.render(
    <StrictMode>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/inheritance.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Game manager={manager} />
      </Box>
    </StrictMode>
  );
}

export const GameLandingPage = () => {

  return (
    <>
      <div id="startGame">
        <div className="landingContainer">
          <div className="sideColumn"></div>
          <div className="landingContent">
            <h1>Conquest</h1>
            {/* <div className="vsContainer"> */}
              {/* <img className="startGameHuman" src={`${process.env.PUBLIC_URL}/img/human.webp`} /> */}
              {/* <span className="startGameVs">VS</span> */}
            {/* </div> */}
            <Button variant="contained" onClick={() => startGame({})}>Play against computer</Button>
            
            <Box sx={{ height: '20vh' }} /> {/* This adds vertical space */}

            <TextField
              label="Server URL"
              variant="outlined"
              id="serverUrl"
              sx={{ margin: '10px 0', backgroundColor: 'white' }}
              fullWidth
            />
            <TextField
              label="Player ID (0 or 1)"
              variant="outlined"
              id="playerId"
              sx={{ margin: '10px 0', backgroundColor: 'white' }}
              fullWidth
            />
            <Button 
              variant="contained" 
              onClick={() => startGame({ serverURL: document.getElementById('serverUrl').value, playerID: document.getElementById('playerId').value })}
              sx={{ marginBottom: '10px' }}
            >
              Play against human
            </Button>
          </div>
          <div className="sideColumn"></div>
        </div>
      </div>
      <div id="game">
      </div>
    </>
  )
}
