import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setTowers } from './tower.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Tower } from '../../simulation/tower';
import { TowerService } from '../../simulation/tower.service';

@Injectable()
export class TowerEffects {
  loadTowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Tower] Load Towers'),
      mergeMap(() =>
        this.towerService.towerData$.pipe(
          map((towers: Tower[]) => setTowers({ towers }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private towerService: TowerService) {}
}
