import { BaseGame, IBaseGameData, IBaseGamePlayer } from '../src';

test('create new game instance', () => {
  const baseGame = new BaseGame();
  expect(baseGame).not.toBeNull();
  expect(baseGame).not.toBeUndefined();
});

test('add a new player', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string; value: string }> = [];
  const gameData: IBaseGameData = { players, options };

  const newGameDataJSON = baseGame.addPlayer({ gameData: JSON.stringify(gameData), userId: 'testId' });
  const newGameData: IBaseGameData = JSON.parse(newGameDataJSON);
  const { players: newPlayers } = newGameData;

  expect(newPlayers.length).toBe(1);
  expect(newPlayers[0].id).toBe('testId');
});

test('remove a player', () => {
  const baseGame = new BaseGame();

  const players: IBaseGamePlayer[] = [];
  const options: Array<{ name: string; value: string }> = [];
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
  const options: Array<{ name: string; value: string }> = [{ name: 'option1', value: 'value1' }];
  const gameData: IBaseGameData = { players, options };

  const newGameDataJSON = baseGame.updateOption({
    gameData: JSON.stringify(gameData),
    name: 'option1',
    value: 'value2',
  });
  const newGameData: IBaseGameData = JSON.parse(newGameDataJSON);
  const { options: newOptions } = newGameData;

  expect(newOptions[0].name).toBe('option1');
  expect(newOptions[0].value).toBe('value2');
});

test('check time variants', () => {
  const timeVariants = BaseGame.getMaxTimeVariants();

  expect(timeVariants['1 hour']).toBe(1000 * 60 * 60);
});
