import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TowerState } from './tower.model';

export const selectTowerState = createFeatureSelector<TowerState>('towers');

export const selectAllTowers = createSelector(
  selectTowerState,
  (state: TowerState) => state.towers
);

export const selectCurrentTower = createSelector(
  selectTowerState,
  (state: TowerState) => state.towers[state.selectedTowerIndex]
);

