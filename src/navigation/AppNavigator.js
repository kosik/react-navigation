import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileOneScreen from '../screens/ProfileOneScreen';
import ProfileTwoScreen from '../screens/ProfileTwoScreen';
import ProfileThreeScreen from '../screens/ProfileThreeScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import SubscribeTwoScreen from '../screens/SubscribeTwoScreen';
import SubscribeResultScreen from '../screens/SubscribeResultScreen';
import AddScreen from '../screens/CardAddResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import SwipeScreen from '../screens/SwipeScreen';

const ProfileStack = createStackNavigator(
  {
    ProfileOne: {
      screen: ProfileOneScreen,
    },
    ProfileTwo: {
      screen: ProfileTwoScreen,
    },
    ProfileThree: {
      screen: ProfileThreeScreen,
    },
    Subscribe: {
      screen: SubscribeScreen,
    },
    SubscribeTwo: {
      screen: SubscribeTwoScreen,
    },
    SubscribeResult: {
      screen: SubscribeResultScreen,
    },
    AddResult: {
      screen: AddScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Profile: {
      screen: ProfileStack,
    },
    Feedback: {
      screen: FeedbackScreen,
    },
    Swipe: {
      screen: SwipeScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const appNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: AuthStack,
    },
    Main: {
      screen: MainStack,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Auth',
  },
);

const appContainer = createAppContainer(appNavigator);
export default appContainer;
