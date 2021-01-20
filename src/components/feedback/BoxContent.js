import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';
import Wrapper from '../common/Wrapper';
import styles from './styles';
import BoxHeaderTitle from './BoxHeaderTitle';
import StyledText from '../common/StyledText';
import {FEEDBACK_OPTIONS} from '../../constants/vals';

const {width} = Dimensions.get('window');

export default class BoxContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    const {
      data,
      isFeedbackSaved,
      onSelectFeedback,
      isFeedbackPossible,
    } = this.props;
    const {isLoading} = this.state;

    return (
      <View style={styles.boxContainer}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.boxImage}
            source={{uri: data.imageURL}}
            onLoadStart={() => {
              this.setState({
                isLoading: true,
              });
            }}
            onLoadEnd={() => {
              this.setState({
                isLoading: false,
              });
            }}
            blurRadius={!isFeedbackPossible ? 10 : 0}
          />
          <View style={styles.activityIndicatorWrapper}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'black'} />
            ) : null}
          </View>
          {!isFeedbackPossible ? (
            <>
              {/* <BlurView
                style={styles.absolute}
                // viewRef={this.state.viewRef}
                blurType="light"
                blurAmount={5}
                reducedTransparencyFallbackColor="white"
              /> */}
              <StyledText
                color={'#fff'}
                fontSize={13}
                content={'PREVIEW COMING SOON'}
                fontWeight={'bold'}
                textAlign={'center'}
              />
            </>
          ) : null}
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.boxItemTitle}>{data.name}</Text>
          <Text style={styles.boxItemDescription}>{data.description}</Text>
          {isFeedbackSaved ? (
            <BoxHeaderTitle content={data.feedback} />
          ) : isFeedbackPossible ? (
            <RNPickerSelect
              placeholder={{
                label: 'Pick your feedback',
                value: null,
              }}
              onValueChange={value => {
                onSelectFeedback(value, data.parent, data.documentID);
              }}
              items={FEEDBACK_OPTIONS}
              useNativeAndroidPickerStyle={false}
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 20,
                  right: 10,
                },
                placeholder: {
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '400',
                },
              }}
              Icon={() => {
                return <View style={styles.pickerIconStyle} />;
              }}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const SELECT_INPUT_WIDTH = width - 100 - 10 - 15 * 2;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 5,
    width: SELECT_INPUT_WIDTH,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 8,
    color: 'black',
    fontSize: 18,
    backgroundColor: '#d9b0f2',
  },
  inputAndroid: {
    marginTop: 5,
    width: SELECT_INPUT_WIDTH,
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingVertical: 8,
    color: 'black',
    fontSize: 18,
    backgroundColor: '#d9b0f2',
  },
});
