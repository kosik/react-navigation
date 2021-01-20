import CardStack, {Card} from 'react-native-card-stack-swiper';
import React, {Component} from 'react';
import {
  Wrapper,
  Container,
  StyledText,
  ProgressiveImage,
} from '../components/common';
import {BackButton} from '../components/feedback';
import {CoverLoading} from '../components/profileone';
import {sizes, colors} from '../constants/theme';
import {PROFILE_DATA} from '../constants/vals';
import {getUserProfileData, updateUserdata} from '../services';
import firebase from 'react-native-firebase';
import * as Utils from '../utils';
import {StyleSheet, Dimensions} from 'react-native';
import {
  ResetButton,
  IconButton,
  BackButton as SwipeBackButton,
} from '../components/swipe';
const SCREEN_WIDTH = Dimensions.get('window').width;
const {SWIPE_CONTENT, SWIPE_TITLE} = PROFILE_DATA;

export default class SwipeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Sample_Card_Array: [],
      isLoading: true,
      acceptedImages: [],
      rejectedImages: [],
      rightState: false,
      leftState: false,
      firstAccept: false,
      No_More_Card: false,
      buttonState: true,
    };
    this.email = this.props.navigation.getParam('email', 'defaultValue');
    this.documentID = this.props.navigation.getParam(
      'documentID',
      'defaultValue',
    );
  }

  componentDidMount = async () => {
    let resData;
    try {
      resData = await getUserProfileData(this.documentID);
      this.profileData = resData;
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        acceptedImages: resData.accepted_images || [],
        rejectedImages: resData.rejected_images || [],
      });
      const events = await firebase.firestore().collection('images');
      events.get().then(querySnapshot => {
        const tempDoc = querySnapshot.docs.map((doc, key) => {
          return {id: doc.data().id, ...doc.data()};
        });

        //all images without accepted images
        const arrayOfObjects = tempDoc;
        const listToDelete = this.state.acceptedImages.concat(
          this.state.rejectedImages,
        );
        let result = arrayOfObjects.filter(
          el => listToDelete.indexOf(el.id) === -1,
        );

        // get random images
        const ImageData = result.sort(() => Math.random() - 0.5);
        this.setState({
          Sample_Card_Array: ImageData,
          isLoading: false,
        });
        if (this.state.Sample_Card_Array.length === 0) {
          this.setState({No_More_Card: true});
        }
      });
    } catch (error) {}
  };

  onAccept = async id => {
    this.state.acceptedImages.push(id);
    const data = this.state.acceptedImages;
    const savingData = {
      accepted_images: data,
    };

    const lastImageId = this.state.Sample_Card_Array.slice(-1).pop().id;
    if (id === lastImageId) {
      this.setState({
        No_More_Card: true,
      });
    }

    try {
      await updateUserdata(this.documentID, savingData);
      this.setState({
        rightState: true,
        leftState: false,
        firstAccept: true,
        buttonState: true,
      });
    } catch (error) {
      Utils.showAlert(
        'Error!',
        "Couldn't save data. Please check you are connected to internet.",
      );
    }
  };

  onReject = async id => {
    this.state.rejectedImages.push(id);
    const data = this.state.rejectedImages;
    const savingData = {
      rejected_images: data,
    };

    const lastImageId = this.state.Sample_Card_Array.slice(-1).pop().id;
    if (id === lastImageId) {
      this.setState({
        No_More_Card: true,
      });
    }

    try {
      await updateUserdata(this.documentID, savingData);
      this.setState({
        rightState: false,
        leftState: true,
        firstAccept: true,
        buttonState: true,
      });
    } catch (error) {
      Utils.showAlert(
        'Error!',
        "Couldn't save data. Please check you are connected to internet.",
      );
    }
  };

  onReset = () => {
    if (this.state.rightState === true) {
      this.state.acceptedImages.pop();
      const data = this.state.acceptedImages;
      const savingData = {
        accepted_images: data,
      };

      try {
        updateUserdata(this.documentID, savingData);
        this.setState({rightState: false, No_More_Card: false});
      } catch (error) {
        Utils.showAlert(
          'Error!',
          "Couldn't save data. Please check you are connected to internet.",
        );
      }
    } else if (this.state.leftState === true) {
      this.state.rejectedImages.pop();
      const data = this.state.rejectedImages;
      const savingData = {
        rejected_images: data,
      };

      try {
        updateUserdata(this.documentID, savingData);
        this.setState({leftState: false, No_More_Card: false});
      } catch (error) {
        Utils.showAlert(
          'Error!',
          "Couldn't save data. Please check you are connected to internet.",
        );
      }
    }
  };

  onGoBack = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('Home', {
      email: this.userEmail,
      documentID,
    });
  };

  render() {
    const {isLoading} = this.state;
    let images = this.state.Sample_Card_Array;
    console.log('===>>>>', SCREEN_WIDTH);
    return (
      <>
        {isLoading ? (
          <CoverLoading />
        ) : (
          <Container>
            <BackButton onPress={this.onGoBack} />
            <Wrapper width={'100%'} secondary={'center'}>
              <StyledText
                fontSize={sizes.xxlargeFontSize}
                content={SWIPE_TITLE}
                fontWeight={'bold'}
                color={colors.black}
              />
            </Wrapper>
            <Wrapper width={'100%'} secondary={'center'}>
              <StyledText
                fontSize={sizes.largeFontSize}
                content={SWIPE_CONTENT}
                fontWeight={'bold'}
                color={colors.black}
              />
            </Wrapper>

            <CardStack
              style={styles.content}
              renderNoMoreCards={() => (
                <>
                  <StyledText
                    fontSize={sizes.smallFontSize}
                    content={'You have reached the end!'}
                    fontWeight={'bold'}
                    color={colors.black}
                    marginTop={10}
                  />
                  <SwipeBackButton onPress={() => this.onGoBack()} />
                </>
              )}
              disableBottomSwipe
              disableTopSwipe
              ref={swiper => {
                this.swiper = swiper;
              }}
              goBackFromLeft={() => console.log('gobackfromleft')}
              onSwipedLeft={index => {
                const id = images[index].id;
                this.onReject(id);
              }}
              onSwipedRight={index => {
                const id = images[index].id;
                this.onAccept(id);
              }}>
              {images.map((item, index) => (
                <Card key={' ' + index} style={styles.card}>
                  <ProgressiveImage
                    source={{uri: item.url}}
                    width={SCREEN_WIDTH * 0.63}
                    height={SCREEN_WIDTH * 0.77}
                    backgroundColor={colors.yellow}
                  />
                </Card>
              ))}
            </CardStack>

            <Wrapper row marginTop={SCREEN_WIDTH * 0.66} primary={'center'}>
              <IconButton
                iconType={'cross'}
                onPress={async () => {
                  if (this.state.buttonState) {
                    this.swiper.swipeLeft();
                    await this.setState({
                      buttonState: false,
                    });
                  }
                }}
              />
              <IconButton
                onPress={async () => {
                  if (this.state.buttonState) {
                    this.swiper.swipeRight();
                    await this.setState({
                      buttonState: false,
                    });
                  }
                }}
              />
            </Wrapper>

            {this.state.firstAccept ? (
              <Wrapper row marginTop={15} primary={'center'}>
                <ResetButton
                  onPress={() => {
                    if (this.state.rightState === true) {
                      this.swiper.goBackFromRight();
                      this.onReset();
                    } else if (this.state.leftState === true) {
                      this.swiper.goBackFromLeft();
                      this.onReset();
                    }
                  }}
                />
              </Wrapper>
            ) : null}
          </Container>
        )}
      </>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.63,
    height: SCREEN_WIDTH * 0.77,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignItems: 'center',
    shadowOpacity: 0.5,
  },
  content: {
    marginTop: 15,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});
