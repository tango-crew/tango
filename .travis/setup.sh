#!/usr/bin/env bash

set -e

echo '>>> Install Cordova <<<'
sudo npm install -g cordova

echo '>>> Install Ionic 2 <<<'
sudo npm install -g ionic@beta

echo '>>> Installing dependencies <<<'
npm install

echo '>>> Restoring the Ionic state<<<'
ionic state restore

echo '>>> Creating signatures to Android <<<'

cat > platforms/android/debug-signing.properties << EOF
storeFile=./../../tango.keystore
storeType=jks
keyAlias=Tango
storePassword=$ANDROID_STORE_PASSWORD
keyPassword=$ANDROID_KEY_PASSWORD
EOF

cat > platforms/android/release-signing.properties << EOF
storeFile=./../../tango.keystore
storeType=jks
keyAlias=Tango
storePassword=$ANDROID_STORE_PASSWORD
keyPassword=$ANDROID_KEY_PASSWORD
EOF

echo '>>> Install Facebook plugin <<<'
cordova -d plugin add https://github.com/Wizcorp/phonegap-facebook-plugin/ --variable APP_ID=$FACEBOOK_APP_ID --variable APP_NAME=$FACEBOOK_APP_NAME
