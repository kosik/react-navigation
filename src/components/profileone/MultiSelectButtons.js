import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import uid from 'uid';
import {Wrapper, StyledText} from '../common/';
import CheckButton from './CheckButton';
import {sizes} from '../../constants/theme';

const checkSelection = (index, indexArray) => {
  const isSelection = indexArray.findIndex(item => item === index);
  return isSelection !== -1;
};

const getIndexOfValue = (value, data) => {
  return data.findIndex(item => item.value === value);
};

const MultiSelectButtons = props => {
  const {
    title,
    description,
    data,
    onSelects,
    checkIcon,
    isLastSingItemFullWidth,
    selectedValues,
  } = props;
  const initialSelIndexs = selectedValues.map((value, key) =>
    getIndexOfValue(value, data),
  );
  const [selIndexs, setSelIndexs] = useState(initialSelIndexs);
  const [selValues, setSelValues] = useState(selectedValues);

  const onCheck = useCallback(
    index => {
      let newIndexs = [...selIndexs];
      let newValues = [...selValues];
      const existedIndex = selIndexs.findIndex(item => item === index);
      if (existedIndex !== -1) {
        newIndexs.splice(existedIndex, 1);
        newValues.splice(existedIndex, 1);
      } else {
        newIndexs.push(index);
        newValues.push(data[index].value);
      }

      setSelIndexs(newIndexs);
      setSelValues(newValues);
      // change the values of the parent component
      onSelects(newValues);
    },
    [data, onSelects, selIndexs, selValues],
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
        numColumns={2}
        renderItem={({item, index}) => (
          <CheckButton
            checkIcon={checkIcon}
            isHalfWidth={
              index === data.length - 1 &&
              index % 2 === 0 &&
              isLastSingItemFullWidth
                ? false
                : true
            }
            isLeft={index % 2 === 0 ? true : false}
            buttonText={item.label}
            isSelected={checkSelection(index, selIndexs)}
            onPress={() => onCheck(index)}
          />
        )}
        keyExtractor={() => uid()}
      />
    </Wrapper>
  );
};

export default MultiSelectButtons;
