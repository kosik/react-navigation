import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Container, Wrapper} from '../components/common';
import {Button, Input, InputTitle, LinkText} from '../components/login';
import {sendCode} from '../services';
import * as Utils from '../utils/funcs';
import actionCodeSettings from '../config/actionCodeSettings';
import {BackButton} from '../components/feedback';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isSentCode: false,
    };
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
  // Reset password
  //
  onResetPassword = async () => {
    const {isSentCode, email} = this.state;
    if (!isSentCode) {
      if (Utils.validateEmail(email)) {
        this.setState({
          isLoading: true,
        });
        try {
          await sendCode(email);
          Utils.showAlert('', 'Sent the reset link to your email successfully');
        } catch (error) {
          Utils.showAlert('', "We can't send reset link now");
        }
        this.setState({
          isLoading: false,
        });
      } else {
        Utils.showAlert('Warning', 'Please type the correct email.');
      }
    }
  };

  //
  // Go back
  //
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {email, isLoading} = this.state;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={styles.contentStyle}>
        <Container>
          {/** Back button */}
          <Wrapper size={1} primary={'flex-start'}>
            <BackButton onPress={this.goBack} />
          </Wrapper>

          <Wrapper>
            {/** Email Input */}
            <InputTitle title={'Please type your email'} />
            <Input
              placeholder={'Type your email'}
              value={email}
              onChangeText={this.onChangeEmail}
            />

            {/** Login */}
            <Button
              buttonText={'Send code'}
              loading={isLoading}
              onPress={isLoading ? null : this.onResetPassword}
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
    width: '100%',
    height: '100%',
  },
});
