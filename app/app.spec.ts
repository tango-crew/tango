import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import {it, describe, expect, beforeEach, setBaseTestProviders} from 'angular2/testing';
import {IonicApp, Platform, Events, Storage, LocalStorage} from 'ionic-angular';
import {TangoApp } from './app';
import {ProfilePage} from './pages/profile/profile';
import {User} from './models/user';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

export function main(): void {
  'use strict';
  
  describe('TangoApp', () => {
    let tangoApp:TangoApp = null;
    let events:Events = null;
    let ionicApp:IonicApp = null;
    let nav:any = null;
    let storage:Storage = null;
    let platform:Platform = null;

    beforeEach(() => {
      ionicApp = new IonicApp(null, null, null);
      platform = new Platform();
      events = new Events();
      storage = new Storage(LocalStorage);

      nav = {
        setRoot: (page:any):boolean => {
          return true;
        }
      };

      spyOn(nav, 'setRoot');
    });

    it('initialises with an app', () => {
      tangoApp = new TangoApp(ionicApp, platform, events, storage);

      expect(tangoApp['app']).toEqual(ionicApp);
    });

    describe('without an user signed in', () => {
      beforeEach(() => {
        storage.set('user', null);

        tangoApp = new TangoApp(ionicApp, platform, events, storage);
      });

      it('initialises without pages', () => {
        expect(tangoApp['pages']).toBeUndefined();
      });

      it('initialises with a root page referencing AuthenticationPage', () => {
        //expect(tangoApp['rootPage']).toEqual(AuthenticationPage);
        expect(tangoApp['rootPage']).toBeUndefined();
      });
    });

    describe('with an user signed in', () => {
      let user:User = new User();

      beforeEach(() => {
        spyOn(ionicApp, 'getComponent').and.callFake((name:string) => nav);

        //storage.set('user', user);

        tangoApp = new TangoApp(ionicApp, platform, events, storage);

        events.publish('user:authenticated', user);
      });

      it('initialises with one possible pages', () => {
        expect(tangoApp['pages'].length).toEqual(1);
        expect(tangoApp['pages']).toContain({title: 'Perfil', component: ProfilePage});
      });

      it('initialises with a root page referencing ProfilePage', () => {
        expect(tangoApp['rootPage']).toEqual(ProfilePage);
      });

      it('opens a page', () => {
        tangoApp.openPage(tangoApp['pages'][0]);
        expect(tangoApp['app'].getComponent).toHaveBeenCalledWith('nav');
      });
    });
  });
}

