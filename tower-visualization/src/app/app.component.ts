import { Component } from '@angular/core';
import { TowerComponent } from './tower/tower.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [TowerComponent]
})
export class AppComponent {
  title = 'tower-visualization';
}
