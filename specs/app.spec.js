// TODO Fix and test the app. Now when I try to import MyApp I get an error.

//import {beforeEachProviders, describe, expect, iit, inject, it, injectAsync, fakeAsync, TestComponentBuilder, tick} from 'angular2/testing';
//import {provide} from 'angular2/angular2';
//import {MockBackend, BaseRequestOptions, Http} from 'angular2/http';
////import {MyApp} from './../www/app/app'
//
//describe('App', function () {
//
//  // provide our implementations or mocks to the dependency injector
//  beforeEachProviders(function () {
//    return [
//      MyApp,
//      BaseRequestOptions,
//      MockBackend,
//      provide(Http, {
//        useFactory: function (backend, defaultOptions) {
//          return new Http(backend, defaultOptions);
//        },
//        deps: [MockBackend, BaseRequestOptions]
//      })
//    ]
//  });
//
//  it('should have a title', inject([MyApp], function (app) {
//    expect(app.title).toEqual('Tango');
//  }));
//});
