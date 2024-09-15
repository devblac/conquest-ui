
// Normally React manages state, but in this case the game state is managed by the backend.
// This file is the only connection between React and the backend.
export class GameStateManager {
    constructor() {
        this.gameState = null;

        // These are selected hand cards, used for actions like discard_cards, trash_cards.
        this.selectedHandCards = [];
    }

    start() {
        this.gameState = jsConquestNew({debug:true}); // debug true is for testing
        return this.gameState;
    }


    // Run action is called by the FE upon a `handleAction` event, so the main player
    // calls it upon clicking on something.
    //
    // Upon running an action, the turn might stay with the player, or switch to the bot.
    // If it switches to the bot, we need to run bot actions until it's the player's turn again.
    //
    // After running ANY action, React needs to re-render. If the bot runs 45 actions, there needs
    // to be 45 re-renders. That's why this function receives a "callback". This callback triggers
    // a re-render.
    runAction(action, callback) {
        // It's the player's turn
        if (this.gameState.turnPlayerID === 0) {
            // If there's no valid action, return the gameState unchanged
            if (!action || !action.kind) {
                return this.gameState;
            }
            // Run the action and update the gameState
            this.gameState = jsRunAction(action);
            this.selectedHandCards = []; // Reset selected hand cards after running any action
        } else {
            // It's the bot's turn
            const changed = this.runBotAction();
            if (!changed) {
                return null; // No change in gameState, so no re-render
            }
        }

        // After the bot ran an action, it might still be the bot's turn.
        //
        // We need to keep running bot actions until it's the player's turn again.
        //
        // Thus, as long as the game is not ended and it's not the player's turn,
        // we keep running bot actions.
        //
        // We can't run the actions immediately, because that is confusing humans, so
        // wait 2 seconds before running the next action.
        //
        // Remember that after each action, React needs to re-render. That's why callback
        // is called (it's React's re-render function).
        if (!this.gameState.isGameEnded && this.gameState.turnPlayerID !== 0) {
            window.setTimeout(() => {
                // Only run if it's still the bot's turn
                if (this.gameState.turnPlayerID === 0) {
                    return;
                }
                // Let runAction decide:
                //
                // - if it's a bot action
                // - if it should continue to run bot actions recursively
                const result = this.runAction({}, callback);
                if (result) {
                    // Only re-render if the gameState has changed
                    callback(result);
                }
            }, 2 * 1000);
        }

        return this.gameState;
    }

    // Run a bot action and return true if the game state has changed
    //
    // Granted this is the ugliest way to check if the gameState has changed:
    // serializing and comparing the gameState is horrible. But the backend
    // doesn't provide a way to answer this. Let's rething that.
    runBotAction() {
        const _before = JSON.stringify(this.gameState);
        this.gameState = jsBotRunAction();
        const _after = JSON.stringify(this.gameState);
        return _before !== _after;
    }

    setSelectedHandCards(shc) {
        this.selectedHandCards = shc;
        return this.selectedHandCards;
    }
}

