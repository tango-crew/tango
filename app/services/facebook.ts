import {Injectable} from 'angular2/core';

/**
 * Angular wrapper for the OpenFB library
 * Allows you to use OpenFB "the Angular 2 way":
 *  - As an Angular service instead of a global object
 *  - Using promises instead of callbacks
 */
@Injectable()
export class FacebookService {
  constructor() {
  }

  init(params) {
    if (typeof facebookConnectPlugin !== 'undefined') {
      facebookConnectPlugin.browserInit(params.appId, params.version);
    }
  }

  login() {
    return new Promise((resolve, reject) => {
      facebookConnectPlugin.login( ["email", 'public_profile'],
        (response) => {
          if (response.status === "connected") {
            resolve(response);
          }
        },
        (response) => reject(response)
      );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      facebookConnectPlugin.logout(
        (response) => resolve(response),
        (response) => reject(response)
      );
    });
  }

  user() {
    return this.api( 'me/?fields=id,name,email', ['email', 'public_profile']);
  }

  api(requestPath, permissions) {
    return new Promise((resolve, reject) => {
      facebookConnectPlugin.api(
        requestPath,
        permissions,
        (response) => {
          resolve(response)
        },
        (response) => reject(response)
      );
    });
  }

  getLoginStatus() {
    return new Promise((resolve, reject) => {
        facebookConnectPlugin.getLoginStatus(
          (response) => resolve(response),
          (response) => reject(response)
        );
    });
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      facebookConnectPlugin.getAccessToken(
        (response) => resolve(response),
        (response) => reject(response)
      );
    });
  }
};
