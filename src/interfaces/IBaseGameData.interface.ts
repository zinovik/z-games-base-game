import { IBaseGamePlayer } from './';

export interface IBaseGameData {
  players: IBaseGamePlayer[];
  options: Array<{ name: string, value: string }>;
}
