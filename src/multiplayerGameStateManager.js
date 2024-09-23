
const MessageTypeHello = 0
const MessageTypeAction = 2

// Normally React manages state, but in this case the game state is managed by the backend.
// This file is the only connection between React and the backend.
export class MultiplayerGameStateManager {
    constructor({serverURL, playerID}) {
        this.serverURL = serverURL;
        this.playerID = playerID;
        this.renderTrigger = () => {};
        this.gameState = {
            possibleActions: [],
            isGameEnded: false,
        };

        // These are selected hand cards, used for actions like discard_cards, trash_cards.
        this.selectedHandCards = [];

        // These are selected cards used on the ConquestDialog component.
        this.conquestDialogSelectedCards = [];
    }

    setRenderTrigger(renderTrigger) {
        this.renderTrigger = renderTrigger;
    }

    start() {
        this.socket = new WebSocket(this.serverURL);

        this.socket.onopen = () => {
          console.log("WebSocket connection opened");
          // Send hello message with playerId
          
          this.socket.send(JSON.stringify({ type: MessageTypeHello, playerID: parseInt(this.playerID) }));
        };
    
        this.socket.onmessage = (event) => {
        console.log("Received message", event.data);
          const data = JSON.parse(event.data);
          if (data.gameState) {
            console.log("Received message contains game state", data.gameState);
            // Set the received game state
            this.gameState = data.gameState;
            this.selectedHandCards = []; // Reset selected hand cards after running any action
            this.conquestDialogSelectedCards = []; // Reset selected hand cards after running any action
            this.renderTrigger(this.gameState);
          }
        };
    
        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
    
        this.socket.onclose = () => {
          console.log("WebSocket connection closed");
        };
    }

    // Run action is called by the FE upon a `handleAction` event, so the main player
    // calls it upon clicking on something.
    runAction(action) {
        if (this.gameState.turnPlayerID != this.playerID) {
            console.log("Not my turn because it's", this.gameState.turnPlayerID, "and it's my", this.playerID);
            return null;
        }

        // If there's no valid action, return the gameState unchanged
        if (!action || !action.kind) {
            console.log("No valid action");
            return null;
        }

        // Run the action and update the gameState
        console.log("Running action", action);
        this.socket.send(JSON.stringify({ type: MessageTypeAction, action: action }));
        return null;
    }

    setSelectedHandCards(shc) {
        this.selectedHandCards = shc;
        return this.selectedHandCards;
    }

    setConquestDialogSelectedCards(sc) {
        this.conquestDialogSelectedCards = sc;
        return this.conquestDialogSelectedCards;
    }
}

