import React, {Component} from 'react';
import {
  Wrapper,
  Container,
  ColorButton,
  StyledText,
} from '../components/common';
import {BackButton} from '../components/feedback';
import {CoverLoading} from '../components/profileone';
import {sizes, colors} from '../constants/theme';
import {PROFILE_DATA} from '../constants/vals';

const {PAYMENT_CONTACT, ADD_SUCCESS, PAYMENT_CONTENT} = PROFILE_DATA;

export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.email = this.props.navigation.getParam('email', 'defaultValue');
    this.documentID = this.props.navigation.getParam(
      'documentID',
      'defaultValue',
    );
    this.customerID = this.props.navigation.getParam(
      'customerID',
      'defaultValue',
    );
    this.state = {
      isLoading: false,
    };
  }

  onGoBack = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('Home', {
      email: this.userEmail,
      documentID,
    });
  };
  toHome = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('Home', {
      email: this.userEmail,
      documentID,
    });
  };

  render() {
    const {isLoading} = this.state;

    return (
      <>
        {isLoading ? (
          <CoverLoading />
        ) : (
          <Container backgroundColor={colors.pink}>
            <BackButton onPress={this.onGoBack} color={colors.white} />
            <Wrapper width={'100%'} marginTop={25}>
              <StyledText
                fontSize={sizes.largeFontSize}
                content={ADD_SUCCESS}
                fontWeight={'bold'}
                color={colors.black}
              />
            </Wrapper>
            <Wrapper width={'100%'} marginTop={20}>
              <StyledText
                fontSize={sizes.normalFontSize}
                content={PAYMENT_CONTENT}
                color={colors.black}
              />
            </Wrapper>
            <Wrapper width={'100%'} marginTop={20}>
              <StyledText
                fontSize={sizes.normalFontSize}
                content={PAYMENT_CONTACT}
                color={colors.black}
              />
            </Wrapper>
            <Wrapper marginTop={70} marginBottom={400}>
              <ColorButton
                onPress={this.toHome}
                buttonText={'GO BACK TO HOME SCREEN'}
                buttonColor={colors.black}
                textColor={colors.pink}
                borderRadius={5}
              />
            </Wrapper>
          </Container>
        )}
      </>
    );
  }
}
