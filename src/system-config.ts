"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'mongoose': 'vendor/mongoose',
  'moment': 'vendor/moment',
  'ng2-datetime': 'vendor/ng2-datetime',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'immutable': 'vendor/immutable/dist'
};

/** User packages configuration. */
const packages: any = {
  'mongoose':{
    main: 'index.js',
    format: 'cjs'
  },
  'moment': {
    main: 'moment.js',
    format: 'cjs'
  },
  'ng2-datetime': {
    main: 'ng2-datetime.js',
    format: 'cjs'
  },
  'ng2-bootstrap': {
    main: 'ng2-bootstrap.js',
    format: 'cjs'
  },
  'immutable': {
    main: 'immutable.js',
    format: 'cjs'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/filters',
  'app/new-campaign',
  'app/campaign-list',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
