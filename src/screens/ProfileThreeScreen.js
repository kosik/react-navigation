import React, {Component} from 'react';
import {StyleSheet, ScrollView, Dimensions, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackButton} from '../components/feedback';
import RNPickerSelect from 'react-native-picker-select';
import {getUserProfileData, updateUserdata} from '../services';

// Import common components
import {Wrapper, ColorButton, StyledText} from '../components/common';

// Import profile components
import {
  MultiSelectButtons,
  HeightInput,
  Container,
  CoverLoading,
  SingelSelectButton,
} from '../components/profileone';

// Load firebase function

// Load theme
import {sizes, colors} from '../constants/theme';

// Load constants
import {
  PROFILE_DATA,
  PROFILE,
  LOCAL_STORAGE,
  FIRESTORE_KEYS,
} from '../constants/vals';
const {
  HEIGHT_TITLE,
  HEIGHT_DESCRIPTION,
  SIZE_TITLE,
  SIZE_DESCRIPTION,
  DENIM_TITLE,
  DENIM_DESCRIPTION,
  FIT_TITLE,
  FIT_DESCRIPTION,
  FIT_DATA,
  YEAR_TITLE,
  YEAR_DATA,
  CONTACT_TITLE,
  CONTACT_DESCRIPTION,
  EMAIL_TITLE,
  EMAIL_DESCRIPTION,
  NAME_TITLE,
  STREET_TITLE,
  ZIP_TITLE,
  DOOR_TITLE,
  CITY_TITLE,
  COUNTRY_TITLE,
  PHONE_TITLE,
} = PROFILE_DATA;
const {PHOTO_URL} = FIRESTORE_KEYS;
const {HEIGHTS, SHIRT_SIZES, DENIM_SIZES} = PROFILE;
const {FCM_TOKEN, EMAIL} = LOCAL_STORAGE;

// Load util funcs
import * as Utils from '../utils';

export default class ProfileThreeScreen extends Component {
  constructor(props) {
    super(props);

    this.email = this.props.navigation.getParam('email', 'defaultValue');
    this.documentID = this.props.navigation.getParam(
      'documentID',
      'defaultValue',
    );
    const data = this.props.navigation.getParam('profileData', {});
    const firstName = data.first_name || '';
    const middleName = data.middle_name || '';
    const lastName = data.last_name || '';
    const name =
      firstName +
      (firstName && ' ') +
      middleName +
      (middleName && ' ') +
      lastName;

    console.log('data.age ===>>>', data.age);

    this.state = {
      isLoading: false,

      height: data.height ? data.height.substring(0, 3) : '',
      savedHeight: data.height || '',
      email: data.email || '',
      name: name,
      address: data.address || '',
      zipCode: data.zip_code || '',
      buildingCode: data.building_code || '',
      city: data.city || '',
      country: data.country || '',
      phone: data.phone || '',
      selectedFits: Utils.generateArrayFromString(data.fit_body_shape),
      selectedYear: data.age || undefined,

      shirtSize: data.shirt_size || '',
      savedShirtSize: data.shirt_size || '',
      denimSize: data.denim_size || '',
      savedDenimSize: data.denim_size || '',

      // related to the inspiration input
      isInspirationEditable: false,
      // savedInspirationText: data.style_preference || '',
      // inspirationText: data.style_preference || '',

      // related to the style input
      isStyleEditable: false,
      savedStyleText: data.no_go || '',
      styleText: data.no_go || '',

      // possiblity for saving data to firestore
      isPossibleSaving: false,
    };
  }
  componentDidMount = async () => {
    let resData;
    try {
      resData = await getUserProfileData(this.documentID);
      this.customerID = resData.customer_id;
    } catch (error) {}
  };
  componentDidUpdate = async () => {
    let resData;
    try {
      resData = await getUserProfileData(this.documentID);
      this.customerID = resData.customer_id;
    } catch (error) {}
  };

  onGoBack = () => {
    this.props.navigation.goBack();
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

  onSelectFits = values => {
    this.setState({
      selectedFits: values,
    });
  };

  onSelectYear = values => {
    this.setState({
      selectedYear: values,
    });
  };

  onSubscribe = async () => {
    this.setState({
      isLoading: true,
    });
    const {
      height,
      selectedFits,
      selectedYear,
      shirtSize,
      denimSize,
      inspirationText,
      styleText,
      email,
      name,
      address,
      zipCode,
      buildingCode,
      city,
      country,
      phone,
    } = this.state;
    'Paul Steve Panakkal'.split(' ');
    const splittedNames = name.split(' ');
    let first_name = '';
    let middle_name = '';
    let last_name = '';
    switch (splittedNames.length) {
      case 1:
        first_name = splittedNames[0];
        break;
      case 2:
        first_name = splittedNames[0];
        last_name = splittedNames[1];
        break;
      case 3:
        first_name = splittedNames[0];
        middle_name = splittedNames[1];
        last_name = splittedNames[2];
        break;
      default:
        break;
    }

    const savingData = {
      height: height ? height + ' cm' : '',
      fit_body_shape: Utils.generateStringFromArray(selectedFits),
      age: selectedYear,
      shirt_size: shirtSize,
      denim_size: denimSize,
      // style_preference: inspirationText,
      //no_go: styleText,
      first_name,
      middle_name,
      last_name,
      email,
      address,
      zip_code: zipCode,
      building_code: buildingCode,
      city,
      country,
      phone,
    };

    try {
      await updateUserdata(this.documentID, savingData);
      // Utils.showAlert('', 'Data saved successfully.');
      this.setState({
        customerID: this.state.customerID,
      });
      if (this.customerID === undefined) {
        this.props.navigation.navigate('Subscribe', {
          email: this.email,
          documentID: this.documentID,
          profileData: this.profileData,
        });
      } else {
        this.props.navigation.navigate('SubscribeTwo', {
          email: this.email,
          documentID: this.documentID,
          profileData: this.profileData,
          customerID: this.customerID,
        });
      }
    } catch (error) {
      Utils.showAlert(
        'Error!',
        "Couldn't save data. Please check you are connected to internet.",
      );
    }
    this.setState({
      isLoading: false,
    });
  };

  onChangeHeight = (value, index) => {
    const {savedHeight} = this.state;

    this.setState({
      height: value || '',
      isPossibleSaving: value !== savedHeight,
    });
  };

  onChangeEmail = text => {
    this.setState({
      email: text,
    });
  };

  onChangeName = text => {
    this.setState({
      name: text,
    });
  };

  onChangeAddress = text => {
    this.setState({
      address: text,
    });
  };

  onChangeZipCode = text => {
    this.setState({
      zipCode: text,
    });
  };

  onChangeBuildingCode = text => {
    this.setState({
      buildingCode: text,
    });
  };

  onChangeCity = text => {
    this.setState({
      city: text,
    });
  };

  onChangeCountry = text => {
    this.setState({
      country: text,
    });
  };

  onChangePhone = text => {
    this.setState({
      phone: text,
    });
  };

  render() {
    const {
      isLoading,
      height,
      selectedFits,
      selectedYear,
      shirtSize,
      denimSize,
      inspirationText,
      styleText,
      email,
      name,
      address,
      zipCode,
      buildingCode,
      city,
      country,
      phone,
    } = this.state;

    return (
      <>
        {isLoading ? (
          <CoverLoading />
        ) : (
          <Container>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <Wrapper paddingHorizontal={sizes.padding}>
                <BackButton onPress={this.onGoBack} />

                {/** Input height */}
                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={HEIGHT_TITLE}
                    fontWeight={'bold'}
                  />
                  <StyledText
                    fontSize={sizes.normalFontSize}
                    content={HEIGHT_DESCRIPTION}
                  />

                  <RNPickerSelect
                    onValueChange={this.onChangeHeight}
                    value={height}
                    items={HEIGHTS}
                    style={pickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: '',
                      value: null,
                      color: '#9EA0A4',
                    }}
                  />
                </Wrapper>

                {/** Select shirt size */}
                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={SIZE_TITLE}
                    fontWeight={'bold'}
                  />
                  <StyledText
                    fontSize={sizes.normalFontSize}
                    content={SIZE_DESCRIPTION}
                  />
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

                {/** Select denim size */}
                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={DENIM_TITLE}
                    fontWeight={'bold'}
                  />
                  <StyledText
                    fontSize={sizes.normalFontSize}
                    content={DENIM_DESCRIPTION}
                  />
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

                {/** Select fits */}
                <MultiSelectButtons
                  title={FIT_TITLE}
                  description={FIT_DESCRIPTION}
                  data={FIT_DATA}
                  onSelects={this.onSelectFits}
                  selectedValues={selectedFits}
                />

                {/** Select year */}
                <SingelSelectButton
                  title={YEAR_TITLE}
                  data={YEAR_DATA}
                  onSelect={this.onSelectYear}
                  selectedValue={selectedYear}
                  isHalfWidth
                />
              </Wrapper>

              <Wrapper
                width={width}
                marginTop={20}
                paddingHorizontal={sizes.padding}
                paddingVertical={sizes.padding}
                backgroundColor={colors.black}>
                <Wrapper width={'100%'}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={CONTACT_TITLE}
                    fontWeight={'bold'}
                    color={colors.white}
                  />
                  <StyledText
                    fontSize={sizes.normalFontSize}
                    content={CONTACT_DESCRIPTION}
                    color={colors.white}
                  />
                </Wrapper>

                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={EMAIL_TITLE}
                    fontWeight={'bold'}
                    color={colors.white}
                  />
                  <StyledText
                    fontSize={sizes.normalFontSize}
                    content={EMAIL_DESCRIPTION}
                    color={colors.white}
                  />
                  <HeightInput
                    color={colors.lightGrey}
                    borderColor={colors.white}
                    placeholderTextColor={colors.lightGrey}
                    placeholder={'Hello@youremail.com'}
                    fontSize={20}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={this.onChangeEmail}
                  />
                </Wrapper>

                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={NAME_TITLE}
                    fontWeight={'bold'}
                    color={colors.white}
                  />
                  <HeightInput
                    color={colors.lightGrey}
                    borderColor={colors.white}
                    placeholderTextColor={colors.lightGrey}
                    placeholder={'Jhon Doe'}
                    fontSize={20}
                    value={name}
                    onChangeText={this.onChangeName}
                  />
                </Wrapper>

                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={STREET_TITLE}
                    fontWeight={'bold'}
                    color={colors.white}
                  />
                  <HeightInput
                    color={colors.lightGrey}
                    borderColor={colors.lightGrey}
                    placeholderTextColor={colors.lightGrey}
                    placeholder={'Rue de gatan 33'}
                    fontSize={20}
                    value={address}
                    onChangeText={this.onChangeAddress}
                  />
                </Wrapper>

                <Wrapper row primary={'space-between'} marginTop={20}>
                  <Wrapper>
                    <StyledText
                      fontSize={sizes.largeFontSize}
                      content={ZIP_TITLE}
                      fontWeight={'bold'}
                      color={colors.white}
                    />
                    <HeightInput
                      color={colors.lightGrey}
                      borderColor={colors.white}
                      placeholderTextColor={colors.lightGrey}
                      placeholder={'0000'}
                      fontSize={20}
                      isHalf={true}
                      keyboardType={'numeric'}
                      value={zipCode}
                      onChangeText={this.onChangeZipCode}
                    />
                  </Wrapper>

                  <Wrapper marginLeft={sizes.padding}>
                    <StyledText
                      fontSize={sizes.largeFontSize}
                      content={DOOR_TITLE}
                      fontWeight={'bold'}
                      color={colors.white}
                    />
                    <HeightInput
                      color={colors.lightGrey}
                      borderColor={colors.white}
                      placeholderTextColor={colors.lightGrey}
                      placeholder={'0000'}
                      fontSize={20}
                      isHalf={true}
                      keyboardType={'numeric'}
                      value={buildingCode}
                      onChangeText={this.onChangeBuildingCode}
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper row primary={'space-between'} marginTop={20}>
                  <Wrapper>
                    <StyledText
                      fontSize={sizes.largeFontSize}
                      content={CITY_TITLE}
                      fontWeight={'bold'}
                      color={colors.white}
                    />
                    <HeightInput
                      color={colors.lightGrey}
                      borderColor={colors.white}
                      placeholderTextColor={colors.lightGrey}
                      placeholder={'Oslo'}
                      fontSize={20}
                      isHalf={true}
                      value={city}
                      onChangeText={this.onChangeCity}
                    />
                  </Wrapper>

                  <Wrapper marginLeft={sizes.padding}>
                    <StyledText
                      fontSize={sizes.largeFontSize}
                      content={COUNTRY_TITLE}
                      fontWeight={'bold'}
                      color={colors.white}
                    />
                    <HeightInput
                      color={colors.lightGrey}
                      borderColor={colors.white}
                      placeholderTextColor={colors.lightGrey}
                      placeholder={'Norway'}
                      fontSize={20}
                      isHalf={true}
                      value={country}
                      onChangeText={this.onChangeCountry}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper width={'100%'} marginTop={20}>
                  <StyledText
                    fontSize={sizes.largeFontSize}
                    content={PHONE_TITLE}
                    fontWeight={'bold'}
                    color={colors.white}
                  />
                  <HeightInput
                    color={colors.lightGrey}
                    borderColor={colors.white}
                    placeholderTextColor={colors.lightGrey}
                    placeholder={'+45 1234567'}
                    fontSize={20}
                    keyboardType={'phone-pad'}
                    value={phone}
                    onChangeText={this.onChangePhone}
                  />
                </Wrapper>

                {/** Color button */}
                <Wrapper marginTop={sizes.xlargepadding}>
                  <ColorButton
                    onPress={this.onSubscribe}
                    buttonText={"LET'S SUBSCRIBE NOW"}
                  />
                </Wrapper>
              </Wrapper>
            </KeyboardAwareScrollView>
          </Container>
        )}
      </>
    );
  }
}

const {width} = Dimensions.get('window');
const pickerAndroidWidth = (width - sizes.padding * 2) / 1;

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
