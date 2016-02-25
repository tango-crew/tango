export class PushNotifications {
  constructor() {
  }

  static start() {
    if (window.plugins && window.plugins.OneSignal) {

      let notificationOpenedCallback = jsonData => console.log(`didReceiveRemoteNotificationCallBack: ${JSON.stringify(jsonData)}`);

      window.plugins.OneSignal.init(
        "ONE_SIGNAL_TOKEN",
        {googleProjectNumber: "GOOGLE_PROJECT_NUMBER"},
        notificationOpenedCallback
      );

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }
  }
}
