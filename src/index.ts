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

export const GAME_NOT_STARTED = 0;
export const GAME_STARTED = 1;
export const GAME_FINISHED = 2;

export class BaseGame {

  public getNewGame: () => { playersMax: number, playersMin: number, gameData: string };

  public startGame: (gameData: string) => { gameData: string, nextPlayersIds: string[] };

  public getRules: () => string[];

  public parseGameDataForUser: (parameters: { gameData: string, userId: string }) => string;

  public makeMove: (parameters: { gameData: string, move: string, userId: string }) => {
    gameData: string,
    nextPlayersIds: string[],
  };

  public addPlayer({ gameData: gameDataJSON, userId }: { gameData: string, userId: string }): string {
    const gameData: BaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    players.push({
      id: userId,
      ready: false,
    } as BaseGamePlayer);

    return JSON.stringify({ ...gameData, players });
  }

  public toggleReady = ({ gameData: gameDataJSON, userId }: { gameData: string, userId: string }): string => {
    const gameData: BaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    const newPlayers = players.map(player => {
      if (player.id === userId) {
        return { ...player, ready: !player.ready };
      }
      return player;
    });

    return JSON.stringify({ ...gameData, players: newPlayers });
  }

  public checkReady = (gameDataJSON: string): boolean => {
    const gameData: BaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    return players.every(player => player.ready);
  }

  public removePlayer = ({ gameData: gameDataJSON, userId }: { gameData: string, userId: string }): string => {
    const gameData: BaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    const newPlayers = players.filter(player => player.id !== userId);

    return JSON.stringify({ ...gameData, players: newPlayers });
  }

}
