import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import { ActionButton } from './ActionButtons';
import { Game } from './components/Game';

const App = () => {
  return <GameLandingPage />;
};

export default App;


export const startGame = ({}) => {
  document.getElementById("startGame").remove();
  const root = createRoot(document.getElementById("game"));
  const manager = new GameStateManager();
  manager.start({});

  root.render(
    <StrictMode>
      <Game manager={manager}/>
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
            <div className="vsContainer">
              <img className="startGameHuman" src={`${process.env.PUBLIC_URL}/img/human.webp`} />
              <span className="startGameVs">VS</span>
            </div>
            <a id="startGameButton" onClick={() => startGame({})}>▶️</a>
          </div>
          <div className="sideColumn"></div>
        </div>
      </div>
      <div id="game">
      </div>
    </>
  )
}
