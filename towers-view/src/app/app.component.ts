import { Component } from '@angular/core';
import { TowerService } from './tower.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'towers-view';

  constructor(public towerService: TowerService) {
    
  }
}
