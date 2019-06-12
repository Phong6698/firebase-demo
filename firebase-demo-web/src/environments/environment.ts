// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {version} from "../_versions";

export const environment = {
  production: false,
  version: versionLong,
  firebase: {
    apiKey: "AIzaSyC9P18TqMSEKUMFuy-Lz6BfXVHOj5zSORo",
    authDomain: "fir-87d91.firebaseapp.com",
    databaseURL: "https://fir-87d91.firebaseio.com",
    projectId: "fir-87d91",
    storageBucket: "fir-87d91.appspot.com",
    messagingSenderId: "847424067463",
    appId: "1:847424067463:web:5594f49d6c4400a6"
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
