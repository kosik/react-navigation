import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import uid from 'uid';
import {Wrapper, StyledText} from '../common/';
import CheckButton from './CheckButton';
import ImageButton from './ImageButton';
import {sizes} from '../../constants/theme';

const checkSelection = (index, indexArray) => {
  const isSelection = indexArray.findIndex(item => item === index);
  return isSelection !== -1;
};

const getIndexOfValue = (value, data) => {
  return data.findIndex(item => item.value === value);
};

const MultiSelectImages = props => {
  const {
    title,
    description,
    data,
    onSelects,
    uncheckedButtonTitle,
    selectedValues,
    originalUnchecked,
  } = props;
  const initialSelIndexs = selectedValues.map((value, key) =>
    getIndexOfValue(value, data),
  );
  const [selIndexs, setSelIndexs] = useState(initialSelIndexs);
  const [selValues, setSelValues] = useState(selectedValues);
  const [isUnchecked, setIsUnchecked] = useState(originalUnchecked);

  const onCheck = useCallback(
    index => {
      if (isUnchecked) {
        setIsUnchecked(false);
      }
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
    [data, isUnchecked, onSelects, selIndexs, selValues],
  );

  const onToggleUnchecked = useCallback(() => {
    const newIndexs = !isUnchecked ? [] : selIndexs;
    const newValues = !isUnchecked ? [] : selValues;
    setSelValues(newValues);
    setSelIndexs(newIndexs);
    onSelects(newValues);
    setIsUnchecked(prevState => !prevState);
  }, [isUnchecked, onSelects, selIndexs, selValues]);

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
          <ImageButton
            isLeft={index % 2 === 0 ? true : false}
            buttonText={item.label}
            img={item.img}
            isSelected={checkSelection(index, selIndexs)}
            onPress={() => onCheck(index)}
            aspectRatio={item.aspectRatio}
          />
        )}
        keyExtractor={() => uid()}
      />

      {uncheckedButtonTitle ? (
        <CheckButton
          buttonText={uncheckedButtonTitle}
          isSelected={isUnchecked}
          onPress={onToggleUnchecked}
        />
      ) : null}
    </Wrapper>
  );
};

export default MultiSelectImages;
