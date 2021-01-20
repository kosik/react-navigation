import React, {Component} from 'react';
import {StyleSheet, ScrollView, FlatList, Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker';
import {Container, Wrapper, Loading} from '../components/common';
import {
  Title,
  FeedbackButton,
  Description,
  Input,
  ViewText,
  UploadImgeItem,
  NextButton,
  LogoutButton,
} from '../components/profile';
// Load firebase function
import {
  signOut,
  getUserData,
  updateUserdata,
  uploadPhoto,
  deletePhotoFromUser,
} from '../services';

// Load constants
import {PROFILE, LOCAL_STORAGE, FIRESTORE_KEYS} from '../constants/vals';
const {PHOTO_URL} = FIRESTORE_KEYS;
const {SHIRT_SIZES, DENIM_SIZES} = PROFILE;
const {FCM_TOKEN, EMAIL} = LOCAL_STORAGE;

// Load util funcs
import * as Utils from '../utils';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.userEmail = this.props.navigation.getParam('email', 'defaultValue');

    this.state = {
      isLoading: false,

      shirtSize: '',
      savedShirtSize: '',
      denimSize: '',
      savedDenimSize: '',

      // document id
      documentID: '',

      // related to the inspiration input
      isInspirationEditable: false,
      savedInspirationText: '',
      inspirationText: '',

      // related to the style input
      isStyleEditable: false,
      savedStyleText: '',
      styleText: '',

      // possiblity for saving data to firestore
      isPossibleSaving: false,

      // All photos
      allPhotos: [],
      currentPage: 1,
      isDeletingPhoto: false,
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    this.setState({
      isLoading: true,
    });
    const fcmtokenFromStroage = await Utils.getFromStorage(FCM_TOKEN);
    const fcmToken = JSON.parse(fcmtokenFromStroage);
    const fetchedUserData = await getUserData(this.userEmail, fcmToken);

    this.setState({
      ...fetchedUserData,
      isLoading: false,
    });
  };

  //
  // Select shirt size
  //
  onChangeShirtSize = (value, index) => {
    const {savedShirtSize} = this.state;

    this.setState({
      shirtSize: value || '',
      isPossibleSaving: value !== savedShirtSize,
    });
  };
  //

  //
  // Select denim size
  //
  onChangeDenimSize = (value, index) => {
    const {savedDenimSize} = this.state;

    this.setState({
      denimSize: value || '',
      isPossibleSaving: value !== savedDenimSize,
    });
  };
  //

  //
  // Input inspiration text
  //
  onChangeInspirationEditable = () => {
    this.setState(prevState => ({
      isInspirationEditable: !prevState.isInspirationEditable,
      isDeletingPhoto: false,
    }));
  };

  onChangeInspirationText = text => {
    const {savedInspirationText} = this.state;

    this.setState({
      inspirationText: text,
      isPossibleSaving: text !== savedInspirationText,
    });
  };
  //

  //
  // Input style text
  //
  onChangeStyleEditable = () => {
    this.setState(prevState => ({
      isStyleEditable: !prevState.isStyleEditable,
      isDeletingPhoto: false,
    }));
  };

  onChangeStyleText = text => {
    const {savedStyleText} = this.state;

    this.setState({
      styleText: text,
      isPossibleSaving: savedStyleText !== text,
    });
  };
  //

  //
  // Check possibility for saving data to firestore
  //
  checkSavingPossibility = () => {
    this.setState({
      isPossibleSaving: true,
    });
  };

  //
  // Go to the Feedback Screen
  //
  goToFeedbackScreen = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('Feedback', {
      email: this.userEmail,
      documentID,
    });
  };

  //
  // Save data to the Firestore
  //
  onSaveData = async () => {
    this.setState({
      isLoading: true,
      isStyleEditable: false,
      isInspirationEditable: false,
    });

    const {
      documentID,
      shirtSize,
      denimSize,
      styleText,
      inspirationText,
    } = this.state;
    const savingData = {
      shirt_size: shirtSize,
      denim_size: denimSize,
      no_go: styleText,
      style_preference: inspirationText,
    };
    try {
      await updateUserdata(documentID, savingData);

      // Update the saved data(shirtSize, denimSize, styleText, inspirationText) with new data
      this.setState({
        isLoading: false,
        isPossibleSaving: false,
        savedShirtSize: shirtSize,
        savedDenimSize: denimSize,
        savedStyleText: styleText,
        savedInspirationText: inspirationText,
      });
      Utils.showAlert('', 'Data saved successfully.');
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      Utils.showAlert(
        'Error!',
        "Couldn't save data. Please check you are connected to internet.",
      );
    }
  };

  onSelectImage = async () => {
    const {allPhotos, documentID} = this.state;
    const startUploadingPoint = allPhotos.findIndex(e => !e.isUploaded);

    try {
      const selectedImages = await ImagePicker.openPicker({
        multiple: true,
        maxFiles: 15,
      });

      // When size of allPhotos isn't enough, create 9 blank photos more
      if (startUploadingPoint + selectedImages.length + 1 > allPhotos.length) {
        const loopArray = Utils.generateNumberArray(9);
        loopArray.forEach(ele => {
          const newPhoto = {
            photoDocumentID: '',
            photoURL: '',
            isUploaded: false,
            isUploading: false,
          };
          allPhotos.push(newPhoto);
        });
      }

      // Update allPhots state with selected photos || NOTE isUploading is true
      selectedImages.forEach((element, index) => {
        const uploadingPoint = startUploadingPoint + index;
        allPhotos[uploadingPoint].photoURL = 'tempory';
        allPhotos[uploadingPoint].isUploaded = false;
        allPhotos[uploadingPoint].isUploading = true;
        this.setState({
          allPhotos,
        });
      });

      // Upload photos to the Firebase storage and add photos to the `photos` collection of this user.
      const uploadedImagesDocs = await uploadPhoto(selectedImages, documentID);

      // Upload and add success
      uploadedImagesDocs.forEach((doc, index) => {
        const uploadingPoint = startUploadingPoint + index;
        allPhotos[uploadingPoint].photoDocumentID = doc.id;
        allPhotos[uploadingPoint].photoURL = doc.get(PHOTO_URL);
        allPhotos[uploadingPoint].isUploaded = true;
        allPhotos[uploadingPoint].isUploading = false;
        this.setState({
          allPhotos,
        });
      });
    } catch (error) {
      // console.log('error=>>>', error);/
    }
  };

  _renderUploladImageItem = (item, index) => {
    const {documentID, isDeletingPhoto} = this.state;

    return (
      <UploadImgeItem
        url={item.photoURL}
        onPress={this.onSelectImage}
        onLongPress={this.onChangeToDeletePhotos}
        isUploading={item.isUploading}
        isDeletingPhoto={isDeletingPhoto}
        onPressDeletePhoto={() =>
          this.onDeletePhoto(documentID, item.photoDocumentID, index)
        }
      />
    );
  };

  //
  // show next photos
  //
  onNextPhotos = () => {
    const {allPhotos, currentPage} = this.state;
    const maxPage = Math.ceil(allPhotos.length / 9);
    if (currentPage + 1 <= maxPage) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  //
  // show previous photos
  //
  onPreviousPhotos = () => {
    const {currentPage} = this.state;
    if (currentPage - 1 >= 1) {
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  //
  // log out
  //
  onLogout = async () => {
    this.setState({
      isLoading: true,
    });
    try {
      await signOut();
      await Utils.removeMultipleItemsFromStorage([EMAIL]);
      this.props.navigation.navigate('Login');
    } catch (error) {}
    this.setState({
      isLoading: false,
    });
  };

  //
  // swithch to status for deleting photos
  //
  onChangeToDeletePhotos = () => {
    this.setState(prevState => ({
      isDeletingPhoto: !prevState.isDeletingPhoto,
    }));
  };

  //
  // delete photo
  //
  onDeletePhoto = async (documentID, photoDocumentID, index) => {
    const {allPhotos} = this.state;
    allPhotos[index].isUploading = true;
    this.setState({
      allPhotos,
    });

    await deletePhotoFromUser(documentID, photoDocumentID);
    // delete the photoItem from allPhotos state.
    allPhotos.splice(index, 1);

    // instead add new blanck item
    const newBlankPhoto = {
      photoDocumentID: '',
      photoURL: '',
      isUploaded: false,
      isUploading: false,
    };
    allPhotos.push(newBlankPhoto);

    this.setState({allPhotos});
  };

  //
  // tap anywhere
  //
  onTapAnywhere = () => {
    this.setState({
      isDeletingPhoto: false,
    });
  };

  render() {
    const {
      isLoading,

      shirtSize,
      denimSize,

      isInspirationEditable,
      inspirationText,

      isStyleEditable,
      styleText,

      isPossibleSaving,

      allPhotos,
      currentPage,
    } = this.state;

    // slice photos
    const maxPage = Math.ceil(allPhotos.length / 9);
    const startPhotoPoint = 9 * (currentPage - 1);
    const endPhotoPoint = 9 * currentPage;

    return (
      <Container>
        {isLoading ? (
          <Wrapper size={1} primary={'center'} secondary={'center'}>
            <Loading size={'large'} />
          </Wrapper>
        ) : (
          <Wrapper onStartShouldSetResponder={this.onTapAnywhere}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Wrapper
                row
                primary={'space-between'}
                secondary={'center'}
                marginTop={20}
                marginBottom={10}>
                <Title
                  content={'Edit your profile'}
                  fontSize={20}
                  marginTop={0}
                  marginBottom={0}
                />
                <LogoutButton onPress={this.onLogout} />
              </Wrapper>

              <FeedbackButton
                buttonText={'GIVE FEEDBACK ON MY BOX'}
                onPress={this.goToFeedbackScreen}
              />

              {/**
               * Select shirt size and denim size
               *
               */}
              <Title content={'Tap to eidt'} />
              <Wrapper row primary={'space-between'}>
                <Wrapper size={1} marginRight={10}>
                  <Description content={'Shirt Size'} />
                  <RNPickerSelect
                    onValueChange={this.onChangeShirtSize}
                    value={shirtSize}
                    items={SHIRT_SIZES}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: '',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  />
                </Wrapper>

                <Wrapper size={1}>
                  <Description content={'Denim Size'} />
                  <RNPickerSelect
                    onValueChange={this.onChangeDenimSize}
                    value={denimSize}
                    items={DENIM_SIZES}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: '',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  />
                </Wrapper>
              </Wrapper>
              <Description
                content={
                  'Cuts, colours, prints that you find most difficult to fit your style and body type'
                }
                marginTop={10}
              />

              {/**
               * Style input
               *
               */}
              {isStyleEditable ? (
                <Input
                  height={120}
                  onChangeText={this.onChangeStyleText}
                  value={styleText}
                  onBlur={this.onChangeStyleEditable}
                />
              ) : (
                <ViewText
                  height={115}
                  content={styleText}
                  onPress={this.onChangeStyleEditable}
                />
              )}
              <Description
                content={'Inspirations: brands, celebrities...'}
                marginTop={10}
              />
              {/**
               * Inspriation input
               *
               */}
              {isInspirationEditable ? (
                <Input
                  height={80}
                  onChangeText={this.onChangeInspirationText}
                  value={inspirationText}
                  onBlur={this.onChangeInspirationEditable}
                />
              ) : (
                <ViewText
                  height={75}
                  content={inspirationText}
                  onPress={this.onChangeInspirationEditable}
                />
              )}

              {/**
               * Save Data
               *
               */}
              {isPossibleSaving ? (
                <FeedbackButton
                  buttonText={'SAVE DATA'}
                  onPress={this.onSaveData}
                />
              ) : null}

              {/**
               * Upload images
               *
               */}
              <Title
                content={
                  'You can upload inspirational pictures to help us help you'
                }
              />
              <FlatList
                data={allPhotos.slice(startPhotoPoint, endPhotoPoint)}
                renderItem={({item, index}) =>
                  this._renderUploladImageItem(item, index + startPhotoPoint)
                }
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
              />
              <Wrapper row primary={'center'}>
                {currentPage !== 1 ? (
                  <NextButton
                    title={'PREVIOUS PHOTOS'}
                    onPress={this.onPreviousPhotos}
                  />
                ) : null}
                {currentPage < maxPage ? (
                  <NextButton
                    title={'NEXT PHOTOS'}
                    onPress={this.onNextPhotos}
                  />
                ) : null}
              </Wrapper>
            </ScrollView>
          </Wrapper>
        )}
      </Container>
    );
  }
}

const {width} = Dimensions.get('window');
const pickerAndroidWidth = (width - 30 - 10) / 2;

// Picker style
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    borderBottomWidth: 5,
    borderColor: 'black',
  },
  inputAndroid: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 0,
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    width: pickerAndroidWidth,
    borderBottomWidth: 5,
    borderColor: 'black',
  },
});
