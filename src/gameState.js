
export class GameStateManager {
    constructor() {
        this.gameState = null;
        this.nextGameState = null;
    }

    start({maxPoints, isFlorEnabled}) {
        this.gameState = jsConquestNew({debug:true}); // debug true is for testing
        return this.gameState;
    }

    runAction(action, callback) {
        if (this.gameState.turnPlayerID === 0) {
            if (!action || !action.kind) {
                return this.gameState;
            }
            this.gameState = jsRunAction(action);
        } else {
            const changed = this.runBotAction();
            if (!changed) {
                return null;
            }
        }

        // If the game is not ended and it's the bot's turn, we run the bot action after a delay
        if (!this.gameState.isGameEnded && this.gameState.turnPlayerID !== 0) {
            // If the bot's last action was "say_flor", let's wait twice the time
            // because it's confusing which such long texts what the bot is doing
            let waitTimeSeconds = 2;
            if (this.gameState.lastActionLog && this.gameState.lastActionLog.action.name === "say_flor" && this.gameState.lastActionLog.playerID === 1) {
                waitTimeSeconds = 4;
            }
            window.setTimeout(() => {
                if (this.gameState.turnPlayerID === 0) {
                    return;
                }
                const result = this.runAction({}, callback);
                if (result) {
                    callback(result);
                }
            }, waitTimeSeconds * 1000);
        }

        return this.gameState;
    }

    runBotAction() {
        const _before = JSON.stringify(this.gameState);
        this.gameState = jsBotRunAction();
        const _after = JSON.stringify(this.gameState);
        return _before !== _after;
    }

}

