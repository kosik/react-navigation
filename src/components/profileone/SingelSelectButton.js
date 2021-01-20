import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import uid from 'uid';
import {Wrapper, StyledText} from '../common';
import CheckButton from './CheckButton';
import {sizes} from '../../constants/theme';

const SingelSelectButton = props => {
  const {
    title,
    data,
    onSelect,
    selectedValue,
    isHalfWidth,
    isLastSingItemFullWidth,
  } = props;
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
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CheckButton
            buttonText={item.label}
            isSelected={index === selIndex}
            onPress={() => onCheck(index)}
            isHalfWidth={
              index === data.length - 1 &&
              index % 2 === 0 &&
              isLastSingItemFullWidth
                ? false
                : isHalfWidth
            }
            isLeft={index % 2 === 0 && isHalfWidth ? true : false}
          />
        )}
        keyExtractor={() => uid()}
        numColumns={isHalfWidth ? 2 : 1}
      />
    </Wrapper>
  );
};

export default SingelSelectButton;
