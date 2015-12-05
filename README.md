# Tango

[![Build Status](https://travis-ci.org/tango-crew/tango.svg?branch=master)](https://travis-ci.org/tango-crew/tango)
[![Code Climate](https://codeclimate.com/github/tango-crew/tango/badges/gpa.svg)](https://codeclimate.com/github/tango-crew/tango)

This is an awesome app to find and schedule hair cuts, make up, and something that you want.

## Getting Started

1. Install Android SDK and set the environment variables

  ```
  export JAVA_HOME=$(/usr/libexec/java_home)
  export ANDROID_HOME=/path/to/android-sdk-macosx
  export PATH=$PATH:${JAVA_HOME}/bin
  export PATH=$PATH:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools
  ```

2. Install [Node Version Manager](https://github.com/creationix/nvm)
3. Clone repo
4. Export the variables described [here](https://docs.google.com/document/d/12XfsJxoqpIvneiJz_i8dL86NOwYy8CISqMZnW6p3650)
5. `chmod 700 bin/setup.sh`
6. `./bin/setup.sh`
7. `npm start`

### Platforms

Add an IOS or Android platform support it is very simple:

1. `ionic platform add ios|android` 
2. `ionic build ios|android`
3. `ionic emulate ios|android`

**Running the *setup.sh* you'll have the Android Platform set :heart_eyes:**

## Preview

You can preview the app installing the [Ionic View](http://view.ionic.io/) on your cell phone. So you can run the following command:
 
```
ionic upload
```

__* Ionic 2 will be integrated within the [Ionic CLI](https://www.npmjs.com/package/ionic), [Ionic Lab](http://lab.ionic.io/), [Ionic Creator](http://creator.ionic.io/) (basically every Ionic tool), to make building an Ionic app even easier.__

## References

* [Ionic Documentation](http://ionicframework.com/docs/v2/)
* [Angular 2 Documentation](https://angular.io/docs/ts/latest/index.html)

## Things to keep in mind

Ionic 2 is alpha, and so is Angular 2. There are number of things being actively worked on that aren't quite ready yet. Here are some things to keep in mind as you try out Ionic 2 and Angular 2:

### Missing Ionic 1 features

We are currently working on completing a few core Ionic 1 features:

- Collection repeat (known as Virtual Scrolling in v2) is not quite ready

### Current Angular 2 known issues:

- Angular 2 is still in alpha and is not production ready
- Angular team has first focused on developing what the core of Angular 2 "is"
- Angular 2 filesize has not been optimized for minification yet
- Angular 2 bootstrap time has not been optimized yet
- As Angular 2 reaches beta there will be significant performance improvements


### ES6/Typescript

- Ionic's source is written using [Typescript](http://www.typescriptlang.org/)
- Ionic apps can be written in ES6 or TypeScript
- Typescript is an optional feature to be used at the developers discretion
- Ionic 2 starters come with the necessary build tools to transpile both ES6 and Typescript


### CSS Attribute Selectors:

- Simple
- Smaller markup
- Easier to read and understand
- [Not an issue](https://twitter.com/paul_irish/status/311610425617838081) for today's mobile browsers
- No performance impacts have been found

#### Webpack

- Starter project is already setup to build Ionic using [Webpack](http://webpack.github.io/)
