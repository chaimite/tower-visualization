import { BehaviorSubject } from "rxjs";
import { StaticDataFactory } from "./static-data-factory";
import { Tower } from "./tower";
import { TowerProgressSimulator } from "./tower-progress-simulator";

export class TowerService {
  private towerDataSubject = new BehaviorSubject<Tower[]>([]);
  public towerData$ = this.towerDataSubject.asObservable();

  constructor() {
    let factory = new StaticDataFactory();
    let towers = factory.build();

    this.towerDataSubject.next(towers);

    const simulator = new TowerProgressSimulator();
    
    setInterval(() => {
      const newTowers = simulator.incrementProgress(towers);
      this.towerDataSubject.next(newTowers);
      towers = newTowers;
    }, 1000)
  }
}

