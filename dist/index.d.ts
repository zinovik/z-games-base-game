export interface BaseGameData {
    players: BaseGamePlayer[];
}
export interface BaseGamePlayer {
    id: string;
    ready: boolean;
    place: number;
}
export interface BaseGameMove {
}
export declare class BaseGame {
    getNewGame: () => {
        playersMax: number;
        playersMin: number;
        gameData: string;
    };
    startGame: (gameData: string) => {
        gameData: string;
        nextPlayersIds: string[];
    };
    getRules: () => string[];
    parseGameDataForUser: (parameters: {
        gameData: string;
        userId: string;
    }) => string;
    makeMove: (parameters: {
        gameData: string;
        move: string;
        userId: string;
    }) => {
        gameData: string;
        nextPlayersIds: string[];
    };
    addPlayer({ gameData: gameDataJSON, userId }: {
        gameData: string;
        userId: string;
    }): string;
    toggleReady: ({ gameData: gameDataJSON, userId }: {
        gameData: string;
        userId: string;
    }) => string;
    checkReady: (gameDataJSON: string) => boolean;
    removePlayer: ({ gameData: gameDataJSON, userId }: {
        gameData: string;
        userId: string;
    }) => string;
}
