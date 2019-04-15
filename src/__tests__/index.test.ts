import { BaseGame, IBaseGameData, IBaseGamePlayer } from '../';

test('create new game instance', () => {
  const baseGame = new BaseGame();
  expect(baseGame).not.toBeNull();
  expect(baseGame).not.toBeUndefined();
});

test('add a new player', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string, value: string }> = [];
  const gameData: IBaseGameData = { players, options };

  const newGameDataJSON = baseGame.addPlayer({ gameData: JSON.stringify(gameData), userId: 'testId' });
  const newGameData: IBaseGameData = JSON.parse(newGameDataJSON);
  const { players: newPlayers } = newGameData;

  expect(newPlayers.length).toBe(1);
  expect(newPlayers[0].id).toBe('testId');
  expect(newPlayers[0].ready).toBe(false);
});

test('toggle player\'s ready', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string, value: string }> = [];
  const gameData: IBaseGameData = { players, options };

  let newGameDataJSON = baseGame.addPlayer({ gameData: JSON.stringify(gameData), userId: 'testId' });
  newGameDataJSON = baseGame.toggleReady({ gameData: newGameDataJSON, userId: 'testId' });
  const newGameData: IBaseGameData = JSON.parse(newGameDataJSON);
  const { players: newPlayers } = newGameData;

  expect(newPlayers[0].ready).toBe(true);
});

test('check every player is ready', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string, value: string }> = [];
  const gameData: IBaseGameData = { players, options };

  let newGameDataJSON = baseGame.addPlayer({ gameData: JSON.stringify(gameData), userId: 'testId' });
  let isEveryPlayerReady = baseGame.checkReady(newGameDataJSON);

  expect(isEveryPlayerReady).toBe(false);

  newGameDataJSON = baseGame.toggleReady({ gameData: newGameDataJSON, userId: 'testId' });
  isEveryPlayerReady = baseGame.checkReady(newGameDataJSON);

  expect(isEveryPlayerReady).toBe(true);
});

test('remove a player', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string, value: string }> = [];
  const gameData: IBaseGameData = { players, options };

  let newGameDataJSON = baseGame.addPlayer({ gameData: JSON.stringify(gameData), userId: 'testId' });
  newGameDataJSON = baseGame.removePlayer({ gameData: newGameDataJSON, userId: 'testId' });
  const newGameData: IBaseGameData = JSON.parse(newGameDataJSON);
  const { players: newPlayers } = newGameData;

  expect(newPlayers.length).toBe(0);
});

test('change an option', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string, value: string }> = [{ name: 'option1', value: 'value1' }];
  const gameData: IBaseGameData = { players, options };

  const newGameDataJSON = baseGame.updateOption({ gameData: JSON.stringify(gameData), name: 'option1', value: 'value2' });
  const newGameData: IBaseGameData = JSON.parse(newGameDataJSON);
  const { options: newOptions } = newGameData;

  expect(newOptions[0].name).toBe('option1');
  expect(newOptions[0].value).toBe('value2');
});
