import React, {Component} from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import DeleteButton from './DeleteButton';
import styles from './styles';

export default class UploadImgeItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  render() {
    const {
      url,
      onPress,
      onLongPress,
      onPressDeletePhoto,
      isUploading,
      isDeletingPhoto,
    } = this.props;
    const {isLoading} = this.state;

    return (
      <TouchableOpacity
        style={[styles.uploadImageWrapper]}
        onLongPress={url && !isUploading ? onLongPress : null}
        onPress={!url ? onPress : null}>
        {!url ? (
          <View style={styles.imagePlaceholderWrapper}>
            <Text style={styles.imagePlaceholderText}>{'+'}</Text>
          </View>
        ) : (
          <>
            {url !== 'tempory' ? (
              <FastImage
                style={styles.uploadImage}
                source={{uri: url}}
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
              />
            ) : null}
            <View style={styles.activityIndicatorWrapper}>
              {isUploading || isLoading ? (
                <ActivityIndicator size={'small'} color={'#161a1e'} />
              ) : null}
            </View>
          </>
        )}
        {url && isDeletingPhoto && !isUploading ? (
          <DeleteButton onPress={onPressDeletePhoto} />
        ) : null}
      </TouchableOpacity>
    );
  }
}
