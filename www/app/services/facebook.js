/**
 * Angular wrapper for the OpenFB library
 * Allows you to use OpenFB "the Angular 2 way":
 *  - As an Angular service instead of a global object
 *  - Using promises instead of callbacks
 */
export class FacebookService {
  constructor() {
  }

  init(params) {
    return window.openFB.init(params);
  }

  login(options) {
    function resolver(resolve, reject) {
      window.openFB.login(function (result) {
        if (result.status === "connected") {
          resolve(result);
        } else {
          reject(result);
        }
      }, options);
    }

    return new Promise(resolver);
  }

  logout() {
    function resolver(resolve, reject) {
      window.openFB.logout(function () {
        resolve();
      });
    }

    return new Promise(resolver);
  }

  api(obj) {
    function resolver(resolve, reject) {
      obj.success = function (result) {
        resolve(result);
      };
      obj.error = function (error) {
        reject(error);
      };
      window.openFB.api(obj);
    }

    return new Promise(resolver);
  }

  revokePermissions() {
    function resolver(resolve, reject) {
      window.openFB.revokePermissions(
        function () {
          resolve();
        },
        function () {
          reject();
        }
      );
    }

    return new Promise(resolver);
  }

  getLoginStatus() {
    function resolver(resolve, reject) {
      window.openFB.getLoginStatus(
        function (result) {
          resolve(result);
        }
      );
    }

    return new Promise(resolver);
  }
}
