import { towerReducer, initialState } from './tower.reducer';
import { setTowers, selectTower } from './tower.actions';
import { GrowthJob } from '../../simulation/growth-job';
import { GrowthTray } from '../../simulation/growth-tray';
import { Slot } from '../../simulation/slot';
import { Tower } from '../../simulation/tower';

describe('Tower Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const result = towerReducer(undefined, action);
    expect(result).toEqual(initialState);
  });

  it('should set the towers array on setTowers action', () => {
    const slots: Slot[] = [
        new Slot(1, new GrowthTray("identity", new GrowthJob("fertil", 10))),
        new Slot(2, new GrowthTray("identity", new GrowthJob("fertil", 30))),
        new Slot(3, new GrowthTray("identity", new GrowthJob("fertil", 100))),
    ]
    const towers: Tower[] = [new Tower(1, slots)];
    const action = setTowers({ towers });
    const state = towerReducer(initialState, action);

    expect(state.towers).toEqual(towers);
    expect(state.selectedTowerIndex).toEqual(initialState.selectedTowerIndex);
  });

  it('should set the selectedTowerIndex on selectTower action', () => {
    const index = 1;
    const action = selectTower({ index });
    const state = towerReducer(initialState, action);

    expect(state.selectedTowerIndex).toEqual(index);
    expect(state.towers).toEqual(initialState.towers);
  });
});
