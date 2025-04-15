import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';

import { Store } from '@ngrx/store';
import { Tower } from '../simulation/tower';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TowerService } from '../simulation/tower.service';
import { setTowers, selectTower } from '../entities/towers/tower.actions';
import { selectAllTowers, selectCurrentTower } from '../entities/towers/tower.selectors';

@Component({
  selector: 'app-tower',
  templateUrl: './tower.component.html',
  styleUrls: ['./tower.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, AsyncPipe],
  providers: [TowerService]
})
export class TowerComponent implements OnInit {
  towers$: Observable<Tower[]>;
  selectedTower$: Observable<Tower>;

  constructor(private store: Store, private towerService: TowerService) {
    this.towers$ = this.store.select(selectAllTowers);
    this.selectedTower$ = this.store.select(selectCurrentTower);
  }

  ngOnInit(): void {
    this.towerService.towerData$.subscribe((towers) => this.store.dispatch(setTowers({towers})))
  }

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
