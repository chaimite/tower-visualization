import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { towerReducer } from './entities/towers/tower.reducer';
import { provideEffects } from '@ngrx/effects';
import { TowerEffects } from './entities/towers/tower.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot(
        { towers: towerReducer },
        {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
            strictActionSerializability: true,
            strictStateSerializability: true,
          },
        }
      )
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
