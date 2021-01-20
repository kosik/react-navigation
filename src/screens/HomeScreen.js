import React, {Component} from 'react';
import {ScrollView, FlatList, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  Container,
  Wrapper,
  Loading,
  StyledText,
  ColorButton,
} from '../components/common';
import {UploadImgeItem, NextButton} from '../components/profile';
import {Badge, LogoutButton, SwipeButton} from '../components/home';
// Load firebase function
import firebase from 'react-native-firebase';
import {
  getUserData,
  uploadPhoto,
  deletePhotoFromUser,
  signOut,
} from '../services';

// Load theme
import {sizes} from '../constants/theme';

// Load constants
import {LOCAL_STORAGE, FIRESTORE_KEYS, HOME_DATA} from '../constants/vals';

const {TITLE, DESCRIPTION, PICTURE_TITLE} = HOME_DATA;
const {PHOTO_URL} = FIRESTORE_KEYS;
const {FCM_TOKEN, EMAIL} = LOCAL_STORAGE;

// Load util funcs
import * as Utils from '../utils';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.userEmail = this.props.navigation.getParam('email', 'defaultValue');

    this.state = {
      isLoading: false,

      // document id
      documentID: '',

      // All photos
      allPhotos: [],
      currentPage: 1,
      isDeletingPhoto: false,

      // All boxes
      activeBoxesCount: 0,
    };
  }

  async componentDidMount() {
    this.fetchUserData();
    // this.willFocusSubscription = this.props.navigation.addListener(
    //   'willFocus',
    //   () => {
    //     this.fetchUserData();
    //   },
    // );
    const querySnapshot = await firebase
      .firestore()
      .collection('users')
      .where('email', '==', this.userEmail)
      .get();
    const documentsSnapshots = querySnapshot.docs;
    const document = documentsSnapshots[0];
    const documentID = document.id;

    this.unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(documentID)
      .collection('boxes')
      .onSnapshot(qs => {
        let activeBoxesCount = 0;
        const updatedDocumentsSnapshots = qs.docs;
        updatedDocumentsSnapshots.forEach(docSnapShot => {
          const eachDocData = docSnapShot.data();
          if (!eachDocData.feedbackSaved) {
            activeBoxesCount++;
          }
        });
        this.setState({
          activeBoxesCount,
        });
      });
  }

  componentWillUnmount() {
    // this.willFocusSubscription.remove();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  fetchUserData = async () => {
    this.setState({
      isLoading: true,
    });
    const fcmtokenFromStroage = await Utils.getFromStorage(FCM_TOKEN);
    const fcmToken = JSON.parse(fcmtokenFromStroage);
    const fetchedUserData = await getUserData(this.userEmail, fcmToken);
    Utils.saveToStorage('feedbackChanged', fetchedUserData.documentID);

    this.setState({
      ...fetchedUserData,
      isLoading: false,
    });
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

  //
  // to profile
  //
  toProfile = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('ProfileOne', {
      email: this.userEmail,
      documentID,
    });
  };

  toSwipe = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('Swipe', {
      email: this.userEmail,
      documentID,
    });
  };

  //
  // to Feedback
  //
  toFeedbackScreen = () => {
    const {documentID} = this.state;
    this.props.navigation.navigate('Feedback', {
      email: this.userEmail,
      documentID,
    });
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
    } catch (error) {
      this.setState({
        isLoading: false,
      });
      Utils.showAlert('Error', 'Fail log out. Try later');
    }
  };

  render() {
    const {
      isLoading,

      allPhotos,
      currentPage,

      activeBoxesCount,
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
          <Wrapper
            width={'100%'}
            onStartShouldSetResponder={this.onTapAnywhere}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Wrapper
                row
                primary={'space-between'}
                secondary={'center'}
                marginTop={20}>
                <LogoutButton onPress={this.onLogout} />
                <Wrapper row secondary={'center'}>
                  <Wrapper marginRight={sizes.smallPadding}>
                    <StyledText
                      fontSize={sizes.normalFontSize}
                      content={'My boxes'}
                    />
                  </Wrapper>
                  <TouchableOpacity onPress={this.toFeedbackScreen}>
                    <Wrapper
                      marginRight={5}
                      width={40}
                      height={40}
                      primary={'center'}
                      secondary={'center'}
                      borderRadius={5}
                      borderWidth={3}>
                      <StyledText
                        fontSize={sizes.normalFontSize}
                        content={activeBoxesCount}
                        fontWeight={'bold'}
                      />
                      {activeBoxesCount ? <Badge /> : null}
                    </Wrapper>
                  </TouchableOpacity>
                </Wrapper>
              </Wrapper>

              <Wrapper marginTop={sizes.normalPadding}>
                <SwipeButton onPress={this.toSwipe} />
              </Wrapper>

              <Wrapper marginTop={sizes.normalPadding}>
                <StyledText
                  fontSize={sizes.largeFontSize}
                  content={TITLE}
                  fontWeight={'bold'}
                />
              </Wrapper>
              <Wrapper marginTop={sizes.normalPadding}>
                <StyledText
                  fontSize={sizes.middleFontSize}
                  content={DESCRIPTION}
                />
              </Wrapper>
              <Wrapper
                marginTop={sizes.normalPadding}
                marginBottom={sizes.smallPadding}>
                <StyledText
                  fontSize={sizes.middleFontSize}
                  content={PICTURE_TITLE}
                />
              </Wrapper>

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

              <Wrapper marginTop={sizes.xlargepadding}>
                <ColorButton
                  onPress={this.toProfile}
                  buttonText={'SET OR EDIT MY STYLE PROFILE'}
                />
              </Wrapper>
            </ScrollView>
          </Wrapper>
        )}
      </Container>
    );
  }
}

export default HomeScreen;
