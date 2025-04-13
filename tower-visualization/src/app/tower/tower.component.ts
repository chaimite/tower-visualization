import { Component, NgModule, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { selectAllTowers, selectCurrentTower } from './tower.selectors';
import { selectTower } from './tower.actions';
import { Store } from '@ngrx/store';
import { Tower } from '../simulation/tower';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.scss'],
  imports: [CommonModule]
})
export class TowerComponent implements OnInit {
  towers$: Observable<Tower[]>;
  selectedTower$: Observable<Tower>;

  constructor(private store: Store) {
    this.towers$ = this.store.select(selectAllTowers);
    this.selectedTower$ = this.store.select(selectCurrentTower);
  }

  ngOnInit(): void {}

  onSelectTower(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const towerNumber = parseInt(target.value, 10);
  
    this.towers$.pipe(take(1)).subscribe(towers => {
      const index = towers.findIndex(t => t.number === towerNumber);
      if (index >= 0) {
        this.store.dispatch(selectTower({ index }));
      }
    });
  }
}
