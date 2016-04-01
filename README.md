# Tango

[![Build Status](https://travis-ci.org/tango-crew/tango.svg?branch=v0.0.1)](https://travis-ci.org/tango-crew/tango)
[![Code Climate](https://codeclimate.com/github/tango-crew/tango/badges/gpa.svg)](https://codeclimate.com/github/tango-crew/tango)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
7. `npm test`

If the tests passed, run:

`npm start`

## Emulate

Execute the following command:

`ionic emulate ios|android`

## Preview

You can preview the app installing the [Ionic View](http://view.ionic.io/) on your cell phone. So you can run the following command:
 
```
ionic upload
```

## Tests

You can see the tests info with the command:

```
npm test
```

## References

* [Ionic Documentation](http://ionicframework.com/docs/v2/)
* [Angular 2 Documentation](https://angular.io/docs/ts/latest/index.html)

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

### Webpack

- Starter project is already setup to build Ionic using [Webpack](http://webpack.github.io/)

## How to contribute :heart_eyes:

Follow the [GitHub Flow](https://guides.github.com/introduction/flow/)

até trocar o facebook plugin usar: 
configurations { all*.exclude group: 'com.android.support', module: 'support-v4' }
