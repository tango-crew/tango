// import {Settings} from '../settings'

export class PushNotifications {
  constructor() {
  }

  static start() {
    if (window.plugins && window.plugins.OneSignal) {

      let notificationOpenedCallback = jsonData => console.log(`didReceiveRemoteNotificationCallBack: ${JSON.stringify(jsonData)}`);

      window.plugins.OneSignal.init(
        Settings.oneSignalKey,
        {googleProjectNumber: Settings.googleProjectNumber},
        notificationOpenedCallback
      );

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }
  }
}
