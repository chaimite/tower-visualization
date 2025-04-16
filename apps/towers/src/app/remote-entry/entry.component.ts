import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerComponent } from '../tower/tower.component';

@Component({
  imports: [CommonModule, TowerComponent],
  selector: 'app-towers-entry',
  template: `<app-tower></app-tower>`,
})
export class RemoteEntryComponent {}
