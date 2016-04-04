#!/usr/bin/env bash

set -e

echo '>>> Install Cordova <<<'
npm install -g cordova

echo '>>> Install Ionic 2 <<<'
npm install -g ionic@beta

echo '>>> Installing dependencies <<<'
npm install

echo '>>> Restoring the Ionic state<<<'
ionic state restore

echo '>>> Creating signatures to Android <<<'
DEBUG_SIGNING_PATH=platforms/android/debug-signing.properties
RELEASE_SIGNING_PATH=platforms/android/release-signing.properties

for signing_path in $DEBUG_SIGNING_PATH $RELEASE_SIGNING_PATH
do
  echo ">>> Creating ${signing_path} <<<"

  touch $signing_path

  echo 'storeFile=./../../tango.keystore' >> $signing_path
  echo 'storeType=jks' >> $signing_path
  echo 'keyAlias=Tango' >> $signing_path
  echo "storePassword=${ANDROID_STORE_PASSWORD}" >> $signing_path
  echo "keyPassword=${ANDROID_KEY_PASSWORD}" >> $signing_path
done

echo '>>> Install Facebook plugin <<<'
cordova plugin add cordova-plugin-facebook4 --variable APP_ID=$FACEBOOK_APP_ID --variable APP_NAME=$FACEBOOK_APP_NAME
