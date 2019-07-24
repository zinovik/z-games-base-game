import { IBaseGameData, IBaseGamePlayer } from './interfaces';

export * from './interfaces';
export * from './constants';

export class BaseGame {
  public getName: () => string;

  public getNameWork: () => string;

  public getNewGame: () => { playersMax: number; playersMin: number; gameData: string };

  public startGame: (gameData: string) => { gameData: string; nextPlayersIds: string[] };

  public getRules: () => string[];

  public parseGameDataForUser: (parameters: { gameData: string; userId: string }) => string;

  public checkMove: (parameters: { gameData: string; move: string; userId: string }) => boolean;

  public makeMove: (parameters: {
    gameData: string;
    move: string;
    userId: string;
  }) => {
    gameData: string;
    nextPlayersIds: string[];
  };

  public getOptionsVariants(): Array<{ name: string; values: string[] }> {
    return [
      {
        name: 'Max Time',
        values: Object.keys(BaseGame.getMaxTimeVariants()),
      },
    ];
  }

  public addPlayer = ({ gameData: gameDataJSON, userId }: { gameData: string; userId: string }): string => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    players.push({
      id: userId,
      ready: false,
    } as IBaseGamePlayer);

    return JSON.stringify({ ...gameData, players });
  };

  public toggleReady = ({ gameData: gameDataJSON, userId }: { gameData: string; userId: string }): string => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    const newPlayers = players.map(player => {
      if (player.id === userId) {
        return { ...player, ready: !player.ready };
      }
      return player;
    });

    return JSON.stringify({ ...gameData, players: newPlayers });
  };

  public checkReady = (gameDataJSON: string): boolean => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);
    const { players } = gameData;

    return players.every(player => player.ready);
  };

  public removePlayer = ({ gameData: gameDataJSON, userId }: { gameData: string; userId: string }): string => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);

    const { players } = gameData;

    const newPlayers = players.filter(player => player.id !== userId);

    return JSON.stringify({ ...gameData, players: newPlayers });
  };

  public updateOption = ({ gameData: gameDataJSON, name, value }: { gameData: string; name: string; value: string }): string => {
    const gameData: IBaseGameData = JSON.parse(gameDataJSON);

    const { options } = gameData;

    const newOptions = options.map(option => (option.name === name ? { name, value } : option));

    return JSON.stringify({ ...gameData, options: newOptions });
  };

  public static getMaxTimeVariants = () => {
    return {
      '1 minute': 1000 * 60,
      '10 minutes': 1000 * 60 * 10,
      '1 hour': 1000 * 60 * 60,
      '24 hours': 1000 * 60 * 60 * 24,
      '7 days': 1000 * 60 * 60 * 24 * 7,
    };
  };
}
