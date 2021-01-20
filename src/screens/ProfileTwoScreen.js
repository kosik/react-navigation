import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {BackButton} from '../components/feedback';

// Import common components
import {Container, Wrapper, ColorButton} from '../components/common';

// Import profile components
import {
  CasualLevels,
  MultiSelectImages,
  MultiSelectButtons,
  SingelSelectButton,
  CoverLoading,
} from '../components/profileone';

// Load firebase function
import {updateUserdata} from '../services';

// Load theme
import {sizes} from '../constants/theme';

// Load constants
import {PROFILE_DATA} from '../constants/vals';
const {
  KIND_TITLE,
  KIND_DESCRIPTION,
  KIND_DATA,
  NO_GO_TYPES_TITLE,
  NO_GO_TYPES_DESCRIPTION,
  NO_GO_TYPES_DATA,
  NO_GO_COLORS_TITLE,
  NO_GO_COLORS_DESCRIPTION,
  NO_GO_COLORS_DATA,
  STYLE_TEXT,
  STYLES_TITLE,
  STYLES_DESCRIPTION,
  STYLES_DATA,
  JEWELLERY_TITLE,
  JEWELLERY_DATA,
  COMFORTABLE_STYLES_TITLE,
  COMFORTABLE_STYLES_DESCRIPTION,
  COMFORTABLE_STYLES_DATA,
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
    const data = this.props.navigation.getParam('profileData', {});
    this.profileData = data;

    this.state = {
      isLoading: false,
      selectedType: Utils.generateArrayFromString(data.look_at_clothes),
      selectedNogos: Utils.generateArrayFromString(data.print_nogo),
      selectedNogoColors: Utils.generateArrayFromString(data.colors_nogo),
      selectedStyles: Utils.generateArrayFromString(data.style_preference),
      selectedJewellerys: data.tone_of_jewellery,
      // selectedComfortableStyles: Utils.generateArrayFromString(
      //   data.style_preference,
      // ),
    };
  }

  componentDidMount = async () => {};

  onGoBack = () => {
    this.props.navigation.goBack();
  };

  onSelectType = value => {
    this.setState({
      selectedType: value,
    });
  };

  onSelectNoGos = values => {
    this.setState({
      selectedNogos: values,
    });
  };

  onSelectNoGoColors = values => {
    this.setState({
      selectedNogoColors: values,
    });
  };

  onSelectStyles = values => {
    this.setState({
      selectedStyles: values,
    });
  };

  onSelectJewellerys = values => {
    this.setState({
      selectedJewellerys: values,
    });
  };

  onSelectComfortableStyles = values => {
    this.setState({
      selectedComfortableStyles: values,
    });
  };

  toProfileThreeScreen = async () => {
    this.setState({
      isLoading: true,
    });
    const {
      selectedType,
      selectedNogos,
      selectedNogoColors,
      selectedStyles,
      selectedJewellerys,
      selectedComfortableStyles,
    } = this.state;
    const savingData = {
      look_at_clothes: Utils.generateStringFromArray(selectedType),
      print_nogo: Utils.generateStringFromArray(selectedNogos),
      no_go: Utils.generateStringFromArray(
        selectedNogoColors.concat(selectedNogos),
      ),
      colors_nogo: Utils.generateStringFromArray(selectedNogoColors),
      style_preference: Utils.generateStringFromArray(selectedStyles),
      tone_of_jewellery: selectedJewellerys,
      // style_preference: Utils.generateStringFromArray(
      //   selectedComfortableStyles,
      // ),
    };

    try {
      if (
        selectedNogos.length === 0 ||
        selectedNogoColors.length === 0 ||
        selectedStyles.length <= 2 ||
        !selectedJewellerys
        // || selectedComfortableStyles.length === 0
      ) {
        if (selectedStyles.length <= 2) {
          Utils.showAlert(
            '',
            'Please select at least 3 option to describe your style',
          );
        } else {
          Utils.showAlert(
            '',
            'Please select at least one option for every question',
          );
        }
      } else {
        await updateUserdata(this.documentID, savingData);
        // Utils.showAlert('', 'Data saved successfully.');
        this.props.navigation.navigate('ProfileThree', {
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
      selectedNogos,
      selectedNogoColors,
      selectedStyles,
      selectedJewellerys,
      selectedComfortableStyles,
    } = this.state;

    return (
      <>
        {isLoading ? (
          <CoverLoading />
        ) : (
          <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
              <BackButton onPress={this.onGoBack} />
              {/** Select casuals */}
              {/* <CasualLevels
                title={KIND_TITLE}
                description={KIND_DESCRIPTION}
                data={KIND_DATA}
                onSelect={this.onSelectType}
                selectedValue={selectedType}
              /> */}

              {/** Select kind of clothes */}
              <MultiSelectImages
                title={KIND_TITLE}
                // description={KIND_DESCRIPTION}
                data={KIND_DATA}
                onSelects={this.onSelectType}
                selectedValues={selectedType}
              />

              {/** Select No-Gos */}
              <MultiSelectImages
                title={NO_GO_TYPES_TITLE}
                description={NO_GO_TYPES_DESCRIPTION}
                data={NO_GO_TYPES_DATA}
                onSelects={this.onSelectNoGos}
                selectedValues={selectedNogos}
              />

              {/** Select No-Go Colors */}
              <MultiSelectButtons
                title={NO_GO_COLORS_TITLE}
                description={NO_GO_COLORS_DESCRIPTION}
                data={NO_GO_COLORS_DATA}
                onSelects={this.onSelectNoGoColors}
                checkIcon={'closecircle'}
                selectedValues={selectedNogoColors}
              />

              {/** Select Jewelleries */}
              <SingelSelectButton
                title={JEWELLERY_TITLE}
                data={JEWELLERY_DATA}
                onSelect={this.onSelectJewellerys}
                selectedValue={selectedJewellerys}
                isLastSingItemFullWidth
                isHalfWidth
              />

              {/** Select No-Go Styles */}
              <MultiSelectButtons
                title={STYLES_TITLE}
                description={STYLES_DESCRIPTION}
                data={STYLES_DATA}
                onSelects={this.onSelectStyles}
                selectedValues={selectedStyles}
              />

              {/** Select Comfortable styles */}
              {/* <MultiSelectButtons
                title={COMFORTABLE_STYLES_TITLE}
                description={COMFORTABLE_STYLES_DESCRIPTION}
                data={COMFORTABLE_STYLES_DATA}
                onSelects={this.onSelectComfortableStyles}
                selectedValues={selectedComfortableStyles}
              /> */}

              {/** Color button */}
              <Wrapper marginTop={sizes.xlargepadding}>
                <ColorButton
                  onPress={this.toProfileThreeScreen}
                  buttonText={'SIZES & SHIPPING INFO'}
                />
              </Wrapper>
            </ScrollView>
          </Container>
        )}
      </>
    );
  }
}
