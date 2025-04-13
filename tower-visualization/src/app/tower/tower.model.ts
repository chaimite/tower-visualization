import { Tower } from "../simulation/tower";

export interface TowerState {
    towers: Tower[];
    selectedTowerIndex: number;
  }