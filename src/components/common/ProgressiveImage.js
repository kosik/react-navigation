import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import styles from './styles';
import Loading from './Loading';
import FastImage from 'react-native-fast-image';

const ProgressiveImage = props => {
  const {width, height, backgroundColor, source, borderRadius = 0} = props; // width and height of the container
  const [loading, setLoading] = useState(true);
  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <View
      style={[
        styles.piContainer,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor || '#fff',
          borderRadius: borderRadius || 5,
        },
      ]}>
      {loading ? (
        <View style={styles.piIndicator}>
          <Loading />
        </View>
      ) : null}
      <FastImage source={source} style={styles.piImage} onLoadEnd={onLoadEnd} />
    </View>
  );
};

export default ProgressiveImage;
