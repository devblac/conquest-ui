import { useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";
import React, { StrictMode } from "react";
import { GameStateManager } from './gameState';
import SpeechBubble from './SpeechBubble';
import ActionButtons from './ActionButtons';
import { ActionButton } from './ActionButtons';
import PlayerSection from './PlayerSection';
import Hand from './components/Hand';
import { playAudio, stopAudio, setMasterSwitchAudioOn } from './audio';
import Toggle from './Toggle';
import gameOverText from './gameOverTexts';
import { getRoundOverContent } from './roundOver';
import { botSrc } from './secretMode';

const App = () => {
  return <GameLandingPage />;
};

export default App;

export const Game = ({ manager }) => {
  const [trigger, setTrigger] = useState(0);

  const handleAction = action => {
    setTrigger(manager.runAction(action, setTrigger))
  }

  const removeModalAndHandleAction = action => {
    const modalOverlay = document.getElementById('roundOverModalOverlay');
    modalOverlay.classList.remove('show');
    stopAudio();
    handleAction(action);
  }

  const removeModalAndLeaveGame = action => {
    const modalOverlay = document.getElementById('gameOverModalOverlay');
    modalOverlay.classList.remove('show');
    window.location.href = window.location.href;
  }

  const gameState = manager.gameState;
  // Here I can check current gameState
  console.error('gameState ', gameState);
  const isHumanTurn = gameState.turnPlayerID === 0;
  const isBotTurn = gameState.turnPlayerID === 1;
  const confirmRoundFinishedAction = gameState.possibleActions.find(action => action.name === "confirm_round_finished");
  const leaveGameAction = {"name": "leave_game"};
  const gameOverTextLinesDiv = document.getElementById('gameOverTextLines');
  const dijeTruco = !gameState.isGameEnded && gameState.possibleActions.some(action => action.name === 'say_truco_quiero' && action.requires_reminder === true);
  let winnerImgSrc = `${process.env.PUBLIC_URL}/img/human.webp`
  let gameOverTextLines = [];

  useEffect(() => {
    if (gameState.isGameEnded) {
      playAudio('finish', {waitMs: 500});
      const modalOverlay = document.getElementById('gameOverModalOverlay');
      if (gameState.winnerPlayerID === 1) {
        const winnerImgElem = document.getElementById('winnerImg');
        winnerImgElem.src = botSrc;
        gameOverTextLines = gameOverText('bot');
      } else {
        gameOverTextLines = gameOverText('human');
      }
      // Clear existing content
      gameOverTextLinesDiv.innerHTML = '';

      // Add new content
      gameOverTextLines.forEach((line, i) => {
        const p = document.createElement('p');
        p.textContent = line;
        gameOverTextLinesDiv.appendChild(p);
      });

      modalOverlay.classList.add('show');
    }
  }, [gameState.isGameEnded]);


  useEffect(() => {
    if (gameState.possibleActions.length === 1 && gameState.possibleActions[0].name === "confirm_round_finished" && !gameState.isGameEnded) {
      // This is because the bot has to confirm the round finished too, or possibly reveal envido score too.
      // Either it did, and then this should be a no-op, or it didn't and this is useful.
      // This action produces no sounds or visual changes so we just run the action alone.
      manager.runBotAction();
      manager.runBotAction();

      playAudio('end', {waitMs: 500});
      const modalOverlay = document.getElementById('roundOverModalOverlay');
      modalOverlay.classList.add('show');
    }
  }, [gameState]);

  return (
    <>
    <div className="board">
      <div className="player-info">
        <div className="player-name">Lord Rattington</div>
        <div className="player-vp">3 VP</div>
      </div>
      <div className="supply">
        <div className="card-row">
          {/* Example Pile of Cards */}
          <div className="card-pile">
            <img src="/img/province.webp" alt="Province" />
            <div className="card-count">8</div>
          </div>
          {/* Repeat for each card pile */}
        </div>
      </div>
      <div className="player-hand">
        <div className="hand-card">
          <img src="/public/img/copper.webp" alt="Copper" />
        </div>
        <div className="hand-card">
          <img src="/public/img/estate.webp" alt="Estate" />
        </div>
        {/* Repeat for each card in hand */}
      </div>
      <div className="status-bar">
        <div className="actions-info">0 Actions | 0 Buys | 0 Coins</div>
        <div className="game-status">WAITING FOR DAKORFA</div>
      </div>
      <div className="chat-box">
        <div className="chat-header">Players can see spectator chat</div>
        <div className="chat-messages">
          {/* Chat messages go here */}
        </div>
        <input type="text" className="chat-input" placeholder="message" />
      </div>
    </div>
    </>
  );
}

export const startGame = ({maxPoints, isFlorEnabled}) => {
  stopAudio();
  document.getElementById("startGame").remove();
  const root = createRoot(document.getElementById("game"));
  const manager = new GameStateManager();
  manager.start({maxPoints, isFlorEnabled});

  root.render(
    <StrictMode>
      <Game manager={manager}/>
    </StrictMode>
  );
}

export const GameLandingPage = () => {
  const [maxPoints, setMaxPoints] = useState(15);
  const [audioOn, setAudioOn] = useState(true);
  const [isFlorEnabled, setIsFlorEnabled] = useState(false);
  const continueAction = {"name": "continue"};

  const showInfoModal = () => {
    const modalOverlay = document.getElementById('infoModal');
    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('show');
  }

  const hideInfoModal = () => {
    const modalOverlay = document.getElementById('infoModal');
    modalOverlay.classList.add('hidden');
    modalOverlay.classList.remove('show');
  }

  useEffect(() => {
    playAudio('intro', {waitMs: 500});
  }, []);

  useEffect(() => {
    setMasterSwitchAudioOn(audioOn);
    if (!audioOn) {
      stopAudio();
    }
  }, [audioOn]);

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
              <img className="startGameBot" src={botSrc} />
            </div>
            <a id="startGameButton" onClick={() => startGame({maxPoints, isFlorEnabled})}>▶️</a>
          </div>
          <div className="sideColumn"></div>
        </div>
      </div>
      <div id="infoModal" className="hidden">
        <div id="infoText">
          <ActionButton action={continueAction} handleAction={hideInfoModal} />
        </div>
      </div>
      
      <div id="game">

      </div>
    </>
  )
}
