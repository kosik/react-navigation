import React, {Component} from 'react';
import {YellowBox} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'react-native-firebase';
// import {Provider} from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
// Load util funcs
import * as Utils from './utils';
// Load constant
import {LOCAL_STORAGE} from './constants/vals';
const {FCM_TOKEN} = LOCAL_STORAGE;
// Import store
// import store from './redux/configureStore';
// let persistor = persistStore(store);

import stripe from 'tipsi-stripe';

import {STRIPE_PUBLISH_KEY} from './config/keys';
stripe.setOptions({
  publishableKey: STRIPE_PUBLISH_KEY,
  // merchantId: '<MERCHANT_ID>',
  androidPayMode: 'test',
});

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.onTokenRefreshListener();
    this.notificationListener();
    this.notificationDisplayedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    const fcmTokenFromStroage = await Utils.getFromStorage(FCM_TOKEN);
    let fcmToken = JSON.parse(fcmTokenFromStroage);

    if (fcmToken === null || fcmToken === '') {
      fcmToken = await firebase.messaging().getToken();
      await Utils.saveToStorage(FCM_TOKEN, fcmToken);
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        if (fcmToken) {
          Utils.saveToStorage(FCM_TOKEN, fcmToken);
        }
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        // console.log('onNotification:::');
        // console.log(notification);
        Utils.showAlert(title, body);
      });

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        const {title, body} = notification.notification;
        // console.log('onNotificationDisplayed:::');
        Utils.showAlert(title, body);
      });
  }

  render() {
    return (
      // <Provider store={store}>
      <AppNavigator />
      // </Provider>
    );
  }
}
