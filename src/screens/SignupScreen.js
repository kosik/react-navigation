import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Container, Wrapper} from '../components/common';
import {Button, Input, InputTitle, LinkText} from '../components/login';
import {createUserWithEmailAndPassword, addNewUser} from '../services';
import {BackButton} from '../components/feedback';
import * as Utils from '../utils';
import {LOCAL_STORAGE} from '../constants/vals';
const {EMAIL, FCM_TOKEN} = LOCAL_STORAGE;

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    const fcmTokenFromStroage = await Utils.getFromStorage(FCM_TOKEN);
    this.fcmToken = JSON.parse(fcmTokenFromStroage);
  }

  //
  // Change eamil
  //
  onChangeEmail = text => {
    this.setState({
      email: text,
    });
  };

  //
  // Change password
  //
  onChangePassword = text => {
    this.setState({
      password: text,
    });
  };

  //
  // Change confirm password
  //
  onChangeConfirmPassword = text => {
    this.setState({
      confirmPassword: text,
    });
  };

  validateInfo = () => {
    const {email, password, confirmPassword} = this.state;
    const isCorrectEmail = Utils.validateEmail(email);
    const isMatchedPassword =
      password === confirmPassword && password.length >= 6;

    if (isCorrectEmail && isMatchedPassword) {
      return true;
    } else if (!isCorrectEmail) {
      Utils.showAlert('Warning', 'Please type correct email');
      return false;
    } else if (!isMatchedPassword) {
      Utils.showAlert('Warning', 'Then length of password is more than 6');
      return false;
    }
  };

  //
  // Login
  //
  onSignup = async () => {
    const {email, password} = this.state;
    if (this.validateInfo()) {
      this.setState({
        isLoading: true,
      });

      try {
        const signedUser = await createUserWithEmailAndPassword(
          email.toLocaleLowerCase(),
          password,
        );
        const signedEmail = signedUser.user.email;
        // Save user data to the local storage
        await Utils.saveToStorage(EMAIL, signedEmail);
        await addNewUser(signedUser.user.email, this.fcmToken);

        // Go to the ProfileScreen
        this.props.navigation.navigate('Home', {email: signedEmail});
      } catch (error) {
        // Signup failure
        Utils.showAlert('Error', 'You have already signed up.');
      }

      this.setState({
        isLoading: false,
      });
    }
  };

  //
  // Go back
  //
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {email, password, confirmPassword, isLoading} = this.state;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={styles.contentStyle}>
        <Container>
          <Wrapper size={1}>
            <BackButton onPress={this.goBack} />
          </Wrapper>

          <Wrapper size={0}>
            {/** Email Input */}
            <InputTitle title={'Email'} />
            <Input
              placeholder={'Type your email address'}
              value={email}
              onChangeText={this.onChangeEmail}
            />

            {/** Password Input */}
            <InputTitle title={'Password'} />
            <Input
              placeholder={'Type your password'}
              value={password}
              onChangeText={this.onChangePassword}
              secureTextEntry={true}
            />

            {/** Confirm Password Input */}
            <InputTitle title={'Confirm Password'} />
            <Input
              placeholder={'Type your password'}
              value={confirmPassword}
              onChangeText={this.onChangeConfirmPassword}
              secureTextEntry={true}
            />

            {/** Sign up */}
            <Button
              buttonText={'SIGN UP'}
              loading={isLoading}
              onPress={isLoading ? null : this.onSignup}
            />
          </Wrapper>

          {/** Link */}
          <Wrapper size={1} primary={'flex-end'} secondary={'center'}>
            <LinkText title={'Go to getyourboxes.com'} />
          </Wrapper>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
  },
});
