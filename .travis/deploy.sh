#! /usr/bin/env sh

echo '>>> Sending to Ionic view <<<'
ionic upload --email $IONIC_EMAIL --password $IONIC_PASSWORD

echo '>>> Sending to Testfairy <<<'
curl 'https://app.testfairy.com/api/upload' \
    -F api_key=$TESTFAIRY_API_KEY \
    -F file=@platforms/android/build/outputs/apk/android-debug.apk \
    -F testers_groups='devs' \
    -F auto-update='on'

