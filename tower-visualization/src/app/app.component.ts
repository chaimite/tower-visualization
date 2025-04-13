import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TowerComponent } from './tower/tower.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [TowerComponent]
})
export class AppComponent {
  title = 'tower-visualization';
}
