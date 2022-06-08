import { BehaviorSubject } from "rxjs";

export class TowerService {
  private towerData = new BehaviorSubject<Tower[]>([]);
  public towerDataChanged$ = this.towerData.asObservable();

  constructor() {
    let factory = new StaticDataFactory();
    let towers = factory.build();

    this.towerData.next(towers);

    const simulator = new TowerProgressSimulator();

    setInterval(() => {
      const newTowers = simulator.incrementProgress(towers);
      this.towerData.next(newTowers);
      towers = newTowers;
    }, 1000)
  }
}

class TowerProgressSimulator {
  constructor() {

  }

  public incrementProgress(towers: Tower[]): Tower[] {
    let newTowers: Tower[] = [];

    for (let i = 0; i < towers.length; i++) {
      const tower = towers[i];
      const newTower = this.copyTower(tower);
      newTower.getGrowthJobs().forEach(x => x.increment());

      newTower.slots.forEach(slot => {
        if (slot.growthTray?.growthJob?.isFinished()) {
          slot.growthTray.growthJob = new GrowthJob(this.getRandomGrowthJobName(), 0);
        }
      })

      newTowers.push(newTower);
    }

    return newTowers;
  }

  private getRandomGrowthJobName() {
    const growthJobNames = ['Basil', 'Strawberry', 'Tomato', 'Kale', 'Lettuce'];

    const min = 0;
    const max = growthJobNames.length - 1;
   
    const randomIndex = Math.floor(Math.random() * (max - min) + min);;

    return growthJobNames[randomIndex];
  }

  private copyTower(oldTower: Tower): Tower {
    let newSlots: Slot[] = [];

    for (let i = 0; i < oldTower.slots.length; i++) {
      const oldSlot = oldTower.slots[i];

      let newGrowthTray: GrowthTray | null = null;
      let newGrowthJob: GrowthJob | null = null;
      if (oldSlot.growthTray != null) {
        
        if (oldSlot.growthTray.growthJob != null) {
          newGrowthJob = new GrowthJob(
            oldSlot.growthTray.growthJob.name,
            oldSlot.growthTray.growthJob.progressPercentage);
        }

        newGrowthTray = new GrowthTray(oldSlot.growthTray.identifier, newGrowthJob)
      }

      let newSlot = new Slot(oldSlot.number, newGrowthTray);
      newSlots.push(newSlot);
    }

    let newTower = new Tower(oldTower.number, newSlots);

    return newTower;
  }
}

class Tower {
  constructor(public number: number, public slots: Slot[]) {

  }

  public getGrowthJobs(): GrowthJob[] {
    let allGrowthJobs: GrowthJob[] = [];

    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];

      if(slot.growthTray?.growthJob != null) {
        allGrowthJobs.push(slot.growthTray.growthJob);
      }
      
    }

    return allGrowthJobs;
  }
}

class Slot {
  constructor(public number: number, public growthTray: GrowthTray | null) {

  }
}

class GrowthTray {
  constructor(public identifier: string, public growthJob: GrowthJob | null) {

  }
}

class GrowthJob {
  private readonly maxPercentage = 100;
  private readonly incrementStep = 10; 

  constructor(public name: string, public progressPercentage: number) {

  }

  public increment() {
    if(this.progressPercentage + this.incrementStep >= this.maxPercentage) {
      this.progressPercentage = this.maxPercentage;
    } else {
      this.progressPercentage = this.progressPercentage + this.incrementStep;
    }
  }

  public isFinished(): boolean {
    return this.progressPercentage >= this.maxPercentage;
  }
}

class StaticDataFactory {
  public build(): Tower[] {
    let tower1Slots: Slot[] = [
      new Slot(1, new GrowthTray("GT A1", new GrowthJob("Basil", 10))),
      new Slot(2, new GrowthTray("GT A2", new GrowthJob("Rocket", 20))),
      new Slot(3, new GrowthTray("GT A3", new GrowthJob("Tomato", 0))),
      new Slot(4, new GrowthTray("GT A4", new GrowthJob("Strawberry", 100))),
      new Slot(5, new GrowthTray("GT A5", new GrowthJob("Basil", 99))),
      new Slot(6, new GrowthTray("GT A6", new GrowthJob("Strawberry", 15))),
      new Slot(7, new GrowthTray("GT A7", new GrowthJob("Kale", 24))),
      new Slot(8, new GrowthTray("GT A8", new GrowthJob("Lettuce", 30))),
      new Slot(9, new GrowthTray("GT A9", new GrowthJob("Tomato", 13))),
      new Slot(10, new GrowthTray("GT A10", new GrowthJob("Basil", 42)))
    ];

    let tower1 = new Tower(1, tower1Slots)

    let tower2Slots: Slot[] = [
      new Slot(1, new GrowthTray("GT B1", new GrowthJob("Tomato", 1))),
      new Slot(2, null),
      new Slot(3, null),
      new Slot(4, new GrowthTray("GT B4", null)),
      new Slot(5, new GrowthTray("GT B5", null)),
      new Slot(6, new GrowthTray("GT B6", null)),
      new Slot(7, new GrowthTray("GT B7", null)),
      new Slot(8, new GrowthTray("GT B8", new GrowthJob("Tomato", 24))),
      new Slot(9, new GrowthTray("GT B9", new GrowthJob("Tomato", 25))),
      new Slot(10, new GrowthTray("GT B10", new GrowthJob("Tomato", 77)))
    ];

    let tower2 = new Tower(2, tower2Slots);

    return [tower1, tower2];
  }
}