import { NgModule } from '@angular/core';
import { TowerComponent } from './tower.component';

@NgModule({
  imports: [TowerComponent],   // Import the standalone component
  exports: [TowerComponent]    // Export it for use in other modules
})
export class TowerModule {}