import React, {useState, useCallback} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import uid from 'uid';
import {Wrapper, StyledText} from '../common';
import {sizes, colors} from '../../constants/theme';
import styles from './styles';

const CasualLevels = props => {
  const {title, description, data, onSelect, selectedValue} = props;
  const initialSelIndex = data.findIndex(item => item.value === selectedValue);
  const [selIndex, setSelIndex] = useState(initialSelIndex);
  const onCheck = useCallback(
    index => {
      setSelIndex(index);
      onSelect(data[index].value);
    },
    [data, onSelect],
  );

  return (
    <Wrapper width={'100%'} marginTop={20}>
      <StyledText
        fontSize={sizes.largeFontSize}
        content={title}
        fontWeight={'bold'}
      />
      {description ? (
        <StyledText fontSize={sizes.normalFontSize} content={description} />
      ) : null}
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              styles.casualButton,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                backgroundColor:
                  index === selIndex ? colors.black : colors.white,
                marginLeft: index === 0 ? 0 : sizes.smallPadding,
              },
            ]}
            onPress={() => onCheck(index)}
          />
        )}
        keyExtractor={() => uid()}
      />
    </Wrapper>
  );
};

export default CasualLevels;
