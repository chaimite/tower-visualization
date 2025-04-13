import { createAction, props } from '@ngrx/store';
import { Tower } from '../simulation/tower';

export const setTowers = createAction('[Tower] Set Towers', props<{ towers: Tower[] }>());
export const selectTower = createAction('[Tower] Select Tower', props<{ index: number }>());
