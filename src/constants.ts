export const GAME_NOT_STARTED = 0;
export const GAME_STARTED = 1;
export const GAME_FINISHED = 2;

export const GAME_STATE_LABEL: { [key: number]: string } = {
  [GAME_NOT_STARTED]: 'not started',
  [GAME_STARTED]: 'started',
  [GAME_FINISHED]: 'finished',
};
