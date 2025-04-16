import { ModuleFederationConfig } from '@nx/module-federation';

const coreLibraries = new Set([
  '@ngrx/store',
  '@ngrx/effects'
]);

const config: ModuleFederationConfig = {
  name: 'towers',
  exposes: {
    './Routes': 'apps/towers/src/app/remote-entry/entry.routes.ts',
  },
  // shared: (libraryName, defaultConfig) => {
  //   if (coreLibraries.has(libraryName)) {
  //     return { ...defaultConfig, singleton: true, strictVersion: false };
  //   }

  //   // Returning false means the library is not shared.
  //   return false;
  // },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
