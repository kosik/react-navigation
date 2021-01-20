import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {BackButton} from '../components/feedback';

// Import common components
import {Container, Wrapper, ColorButton} from '../components/common';

// Import profile components
import {
  SingelSelectButton,
  MultiSelectImages,
  LongMultiSelectButtons,
  CoverLoading,
} from '../components/profileone';

// Load firebase function
import {getUserProfileData, updateUserdata} from '../services';

// Load theme
import {sizes} from '../constants/theme';

// Load constants
import {PROFILE_DATA} from '../constants/vals';
const {
  TYPE_TITLE,
  TYPE_DATA,
  FEEL_TITLE,
  FEEL_DATA,
  TOPS_TITLE,
  TOPS_DATA,
  TOPS_DESCRIPTION,
  JUMPERS_TITLE,
  JUMPERS_DESCRIPTION,
  JUMPERS_DATA,
  DRESSES_TITLE,
  DRESSES_DESCRIPTION,
  DRESSES_DATA,
  DRESSES_BUTTON_TITLE,
} = PROFILE_DATA;

// Load util funcs
import * as Utils from '../utils';

export default class ProfileOneScreen extends Component {
  constructor(props) {
    super(props);

    this.email = this.props.navigation.getParam('email', 'defaultValue');
    this.documentID = this.props.navigation.getParam(
      'documentID',
      'defaultValue',
    );

    this.state = {
      isLoading: true,
      selectedType: undefined,
      selectedFeel: undefined,
      selectedJumpers: [],
      selectedTops: [],
      selectedDresses: [],
    };
  }

  componentDidMount = async () => {
    let resData;
    try {
      resData = await getUserProfileData(this.documentID);
      this.profileData = resData;
    } catch (error) {}

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      isLoading: false,
      selectedType: resData.type_of_clothes || '',
      selectedFeel: Utils.generateArrayFromString(resData.feel_in_clothes),
      selectedTops: Utils.generateArrayFromString(resData.cut_of_tops),
      selectedDresses: Utils.generateArrayFromString(resData.cut_of_dresses),
      selectedJumpers: Utils.generateArrayFromString(
        resData.favourite_pullover,
      ),
    });
  };

  onGoBack = () => {
    this.props.navigation.navigate('Home');
  };

  onSelectedType = value => {
    this.setState({
      selectedType: value,
    });
  };

  onSelectedFeel = values => {
    this.setState({
      selectedFeel: values,
    });
  };

  onSelectTops = values => {
    this.setState({
      selectedTops: values,
    });
  };

  onSelectDresses = values => {
    this.setState({
      selectedDresses: values,
    });
  };

  onSelectJumpers = values => {
    this.setState({
      selectedJumpers: values,
    });
  };

  toProfileTwoScreen = async () => {
    this.setState({
      isLoading: true,
    });
    const {
      selectedType,
      selectedFeel,
      selectedJumpers,
      selectedTops,
      selectedDresses,
    } = this.state;
    const savingData = {
      type_of_clothes: selectedType,
      feel_in_clothes: Utils.generateStringFromArray(selectedFeel),
      cut_of_tops: Utils.generateStringFromArray(selectedTops),
      cut_of_dresses: Utils.generateStringFromArray(selectedDresses),
      favourite_pullover: Utils.generateStringFromArray(selectedJumpers),
    };

    try {
      if (
        !selectedType ||
        selectedJumpers.length === 0 ||
        selectedJumpers.length === 0 ||
        selectedTops.length === 0
      ) {
        Utils.showAlert(
          '',
          'Please select at least one option for every question',
        );
      } else {
        await updateUserdata(this.documentID, savingData);
        // Utils.showAlert('', 'Data saved successfully.');
        this.props.navigation.navigate('ProfileTwo', {
          email: this.email,
          documentID: this.documentID,
          profileData: this.profileData,
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

  render() {
    const {
      isLoading,
      selectedType,
      selectedFeel,
      selectedTops,
      selectedDresses,
      selectedJumpers,
    } = this.state;

    return (
      <>
        {isLoading ? (
          <CoverLoading />
        ) : (
          <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
              <BackButton onPress={this.onGoBack} />
              {/** Select type of clothes */}
              <SingelSelectButton
                title={TYPE_TITLE}
                data={TYPE_DATA}
                onSelect={this.onSelectedType}
                selectedValue={selectedType}
              />

              {/** Select feel of clothes */}
              <LongMultiSelectButtons
                title={FEEL_TITLE}
                data={FEEL_DATA}
                onSelects={this.onSelectedFeel}
                selectedValues={selectedFeel}
              />

              {/** Select Tops */}
              <MultiSelectImages
                title={TOPS_TITLE}
                description={TOPS_DESCRIPTION}
                data={TOPS_DATA}
                onSelects={this.onSelectTops}
                selectedValues={selectedTops}
              />

              {/** Select Dresses */}
              <MultiSelectImages
                title={DRESSES_TITLE}
                description={DRESSES_DESCRIPTION}
                data={DRESSES_DATA}
                onSelects={this.onSelectDresses}
                originalUnchecked={!(selectedDresses.length > 0)}
                uncheckedButtonTitle={DRESSES_BUTTON_TITLE}
                selectedValues={selectedDresses}
              />

              {/** Select Jumpers */}
              <MultiSelectImages
                title={JUMPERS_TITLE}
                description={JUMPERS_DESCRIPTION}
                data={JUMPERS_DATA}
                onSelects={this.onSelectJumpers}
                selectedValues={selectedJumpers}
              />

              {/** Color button */}
              <Wrapper marginTop={sizes.xlargepadding}>
                <ColorButton
                  onPress={this.toProfileTwoScreen}
                  buttonText={'SAVE & CONTINUE'}
                />
              </Wrapper>
            </ScrollView>
          </Container>
        )}
      </>
    );
  }
}
