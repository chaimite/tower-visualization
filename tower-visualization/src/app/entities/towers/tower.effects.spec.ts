import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TowerEffects } from './tower.effects';
import { setTowers } from './tower.actions';
import { GrowthJob } from '../../simulation/growth-job';
import { GrowthTray } from '../../simulation/growth-tray';
import { Slot } from '../../simulation/slot';
import { Tower } from '../../simulation/tower';
import { TowerService } from '../../simulation/tower.service';

describe('TowerEffects', () => {
  let effects: TowerEffects;
  let actions$: Observable<any>;
  let towerService: jasmine.SpyObj<TowerService>;
  const slots: Slot[] = [
          new Slot(1, new GrowthTray("identity", new GrowthJob("fertil", 10))),
          new Slot(2, new GrowthTray("identity", new GrowthJob("fertil", 30))),
          new Slot(3, new GrowthTray("identity", new GrowthJob("fertil", 100))),
      ]
      const towers: Tower[] = [new Tower(1, slots)];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TowerEffects,
        provideMockActions(() => actions$),
        {
          provide: TowerService,
          useValue: {
            towerData$: of([
              { number: 1, slots: slots },
              { number: 2, slots: slots }
            ] as Tower[])
          }
        }
      ]
    });

    effects = TestBed.inject(TowerEffects);
    towerService = TestBed.inject(TowerService) as jasmine.SpyObj<TowerService>;
  });

  it('should dispatch setTowers action on loadTowers$', (done) => {
    actions$ = of({ type: '[Tower] Load Towers' });

    effects.loadTowers$.subscribe(action => {
      expect(action).toEqual(setTowers({ towers: [
        { number: 1, slots: slots},
        { number: 2, slots: slots }
      ] as Tower[] }));
      done();
    });
  });
});
