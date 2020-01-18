// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {versionLong} from '../_versions';

export const environment = {
  production: false,
  version: versionLong,
  firebase: {
    apiKey: 'AIzaSyAJsJNEBcsnj-NvJT65hkW9oct33Y1kcDk',
    authDomain: 'fir-dev-423cd.firebaseapp.com',
    databaseURL: 'https://fir-dev-423cd.firebaseio.com',
    projectId: 'fir-dev-423cd',
    storageBucket: 'fir-dev-423cd.appspot.com',
    messagingSenderId: '979297538852',
    appId: '1:979297538852:web:d78f26a4739bb72a'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
