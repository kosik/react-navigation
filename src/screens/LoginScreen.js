import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Linking, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Container, Wrapper} from '../components/common';
import {
  Logo,
  Button,
  Input,
  InputTitle,
  TextButton,
  BodyContainer,
  BottomText,
} from '../components/login';
// Load firebase function
import {signInWithEmailAndPassword, onAuthStateChanged} from '../services';

// Load util funcs
import * as Utils from '../utils';

// Load constants
import {LOCAL_STORAGE} from '../constants/vals';
const {EMAIL} = LOCAL_STORAGE;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;
    this.state = {
      // email: 'testone@test.com',
      // password: '123456',
      email: '',
      password: '',
      isSigning: false,
      user: null,
    };
  }

  componentDidMount() {
    onAuthStateChanged(this.signInSuccess);
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  signInSuccess = user => {
    if (user) {
      const {email} = user;
      this.props.navigation.navigate('Home', {
        email,
      });
    }
  };

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

  validateInfo = () => {
    const {email, password} = this.state;
    const isCorrectEmail = Utils.validateEmail(email);
    const isCorrectPassword = password.length >= 6;

    if (isCorrectEmail && isCorrectPassword) {
      return true;
    } else if (!isCorrectEmail) {
      Utils.showAlert('Warning', 'Please type correct email');
      return false;
    } else if (!isCorrectPassword) {
      Utils.showAlert('Warning', 'Then length of password is more than 6');
      return false;
    }
  };

  //
  // Login
  //
  onLogin = async () => {
    const {email, password} = this.state;
    if (this.validateInfo()) {
      this.setState({
        isSigning: true,
      });
      try {
        const signed = await signInWithEmailAndPassword(
          email.toLocaleLowerCase(),
          password,
        );
        //
        // Login success ===>
        //
        const signedEmail = signed.user.email;

        // Save user data to the local storage
        await Utils.saveToStorage(EMAIL, signedEmail);

        // Go to the ProfileScreen
        this.signInSuccess(signed.user);
      } catch (error) {
        //
        // Login failure ===>
        //
        console.log('error ===>>>', error);
        Utils.showAlert('Warning', "Email or password isn't correct");

        this.setState({
          isSigning: false,
        });
      }
    }
  };

  //
  // Signup
  //
  onSignUp = () => {
    this.props.navigation.navigate('Signup');
  };

  //
  // Forget passowrd
  //
  onForgotPassord = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  //
  // go to Getyourboxes.com
  //
  gotoBox = () => {
    Linking.openURL('https://getyourboxes.com');
  };

  render() {
    const {email, password, isSigning} = this.state;

    return (
      <Container>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          contentContainerStyle={styles.contentStyle}>
          <BodyContainer>
            {/** Logo */}
            <Wrapper size={1} primary={'center'}>
              <Logo />
            </Wrapper>

            <Wrapper>
              {/** Email Input */}
              <InputTitle title={'Email'} />
              <Input
                placeholder={'Type your email address'}
                value={email}
                onChangeText={this.onChangeEmail}
              />

              {/** Password Input */}
              <Wrapper
                row
                width={'100%'}
                primary={'space-between'}
                secondary={'center'}
                marginBottom={10}>
                <InputTitle title={'Password'} marginBottom={0.1} />
                <TextButton
                  buttonText={'Reset your password'}
                  textDecorationLine={'underline'}
                  fontSize={20}
                  onPress={this.onForgotPassord}
                />
              </Wrapper>

              <Input
                placeholder={'Type your password'}
                value={password}
                onChangeText={this.onChangePassword}
                secureTextEntry={true}
              />

              {/** Login */}
              <Button
                buttonText={'LOGIN'}
                loading={isSigning}
                onPress={isSigning ? null : this.onLogin}
              />
            </Wrapper>

            {/** Signup and reset password */}
            <Wrapper size={1} secondary={'center'}>
              <TextButton
                marginTop={10}
                buttonText={'SIGN-UP HERE'}
                onPress={this.onSignUp}
              />
              <Wrapper size={1} />
              <Wrapper secondary={'center'} marginTop={10}>
                <BottomText title={'Want to learn more about our service'} />
                <Wrapper row>
                  <BottomText title={'Go to  '} />
                  <TouchableOpacity onPress={this.gotoBox}>
                    <BottomText
                      title={'Getyourboxes.com'}
                      textDecorationLine={'underline'}
                    />
                  </TouchableOpacity>
                </Wrapper>
                {/* <BottomText title={'to create your account'} /> */}
              </Wrapper>
            </Wrapper>
          </BodyContainer>
        </KeyboardAwareScrollView>
      </Container>
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
