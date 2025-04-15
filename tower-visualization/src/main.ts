import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TowerService } from './app/simulation/tower.service';
import { towerReducer } from './app/entities/towers/tower.reducer';

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
