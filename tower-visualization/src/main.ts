import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { towerReducer } from './app/tower/tower.reducer';
import { TowerService } from './app/simulation/tower.service';

bootstrapApplication(AppComponent, {
  providers: [TowerService,
    importProvidersFrom(
      StoreModule.forRoot(
        { towers: towerReducer }
      )
    )
  ]
})
  .catch((err) => console.error(err));
