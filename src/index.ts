import { IBaseGameData, IBaseGamePlayer } from './interfaces';

export * from './interfaces';
export * from './constants';

export class BaseGame {

  public getName: () => string;

  public getNameWork: () => string;

  public getNewGame: () => { playersMax: number, playersMin: number, gameData: string };

  public startGame: (gameData: string) => { gameData: string, nextPlayersIds: string[] };

  public getRules: () => string[];

  public parseGameDataForUser: (parameters: { gameData: string, userId: string }) => string;

  public checkMove: (parameters: { gameData: string, move: string, userId: string }) => boolean;

  public makeMove: (parameters: { gameData: string, move: string, userId: string }) => {
    gameData: string,
    nextPlayersIds: string[],
  };

  public addPlayer({ gameData: gameDataJSON, userId }: { gameData: string, userId: string }): string {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    players.push({
      id: userId,
      ready: false,
    } as IBaseGamePlayer);

    return JSON.stringify({ ...gameData, players });
  }

  public toggleReady = ({ gameData: gameDataJSON, userId }: { gameData: string, userId: string }): string => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);
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
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    return players.every(player => player.ready);
  }

  public removePlayer = ({ gameData: gameDataJSON, userId }: { gameData: string, userId: string }): string => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);

    const { players } = gameData;

    const newPlayers = players.filter(player => player.id !== userId);

    return JSON.stringify({ ...gameData, players: newPlayers });
  }

}
