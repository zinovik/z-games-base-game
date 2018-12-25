"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseGame {
    constructor() {
        this.toggleReady = ({ gameData: gameDataJSON, userId }) => {
            const gameData = JSON.parse(gameDataJSON);
            let { players } = gameData;
            players = players.map(player => {
                if (player.id === userId) {
                    return Object.assign({}, player, { ready: !player.ready });
                }
                return player;
            });
            return JSON.stringify(Object.assign({}, gameData, { players }));
        };
        this.checkReady = (gameDataJSON) => {
            const gameData = JSON.parse(gameDataJSON);
            const { players } = gameData;
            return players.every(player => player.ready);
        };
        this.removePlayer = ({ gameData: gameDataJSON, userId }) => {
            const gameData = JSON.parse(gameDataJSON);
            let { players } = gameData;
            players = players.filter(player => player.id !== userId);
            return JSON.stringify(Object.assign({}, gameData, { players }));
        };
    }
    addPlayer({ gameData: gameDataJSON, userId }) {
        const gameData = JSON.parse(gameDataJSON);
        const { players } = gameData;
        players.push({
            id: userId,
            ready: false,
        });
        return JSON.stringify(Object.assign({}, gameData, { players }));
    }
}
exports.BaseGame = BaseGame;
