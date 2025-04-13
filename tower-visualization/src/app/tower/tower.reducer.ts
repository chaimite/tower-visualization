import { createReducer, on } from '@ngrx/store';
import { setTowers, selectTower } from './tower.actions';
import { TowerState } from './tower.model';

export const initialState: TowerState = {
  towers: [],
  selectedTowerIndex: 0,
};

export const towerReducer = createReducer(
  initialState,
  on(setTowers, (state, { towers }) => ({ ...state, towers })),
  on(selectTower, (state, { index }) => ({ ...state, selectedTowerIndex: index }))
);
