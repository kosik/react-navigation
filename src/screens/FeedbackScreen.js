import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, FlatList, View} from 'react-native';
import {Container, Loading, Wrapper} from '../components/common';
import firebase from 'react-native-firebase';
import {
  BackButton,
  BoxContent,
  BoxHeaderTitle,
  BoxHeaderDescription,
  BoxFooter,
  ExpandButton,
  BoxStatusText,
} from '../components/feedback';
import {Title, FeedbackButton} from '../components/profile';
import {getUserBoxes, getBoxItems, saveFeedback} from '../services';
import Accordion from 'react-native-collapsible/Accordion';

// Load constants
import {FIRESTORE_KEYS} from '../constants/vals';
const {DOCUMENT_ID, BOX_CREATED_AT, BOX_FEEDBACK_SAVED} = FIRESTORE_KEYS;

// Load util funcs
import * as Utils from '../utils/funcs';
const firestoreNow = firebase.firestore.Timestamp.now().seconds;

export default class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.email = this.props.navigation.getParam('email', 'defaultValue');
    this.documentID = this.props.navigation.getParam(
      'documentID',
      'defaultValue',
    );

    this.state = {
      isLoading: true,
      allBoxes: [],
    };
  }

  componentDidMount() {
    this.fetchUserBoxes();
  }

  //
  // Fetch all boxes of the user
  //
  fetchUserBoxes = async () => {
    this.setState({isLoading: true});
    const allBoxes = await getUserBoxes(this.documentID);
    const allBoxItems = await this.fetchBoxItems(allBoxes);

    this.setState({
      isLoading: false,
      allBoxes,
      allBoxItems,
      activeSections: [],
      selectedItems: [],
    });
  };

  fetchBoxItems = async allBoxes => {
    const allBoxesItems = allBoxes.map((box, key) => {
      return getBoxItems(this.documentID, box.documentID);
    });
    return await Promise.all(allBoxesItems);
  };

  _renderHeader = (content, index, isActive, sections) => {
    return (
      <Wrapper
        row
        primary={'space-between'}
        secondary={'center'}
        marginTop={10}
        marginBottom={10}>
        <Wrapper>
          <BoxHeaderTitle content={'Box'} />
          <BoxHeaderDescription
            content={content[BOX_CREATED_AT].toDateString()}
          />
        </Wrapper>
        <ExpandButton isExpanded={isActive} />
      </Wrapper>
    );
  };

  onSelectFeedBack = (value, parentID, boxItemDocumentID) => {
    const {allBoxItems} = this.state;
    const selectedItems = allBoxItems.find(ele => ele[0].parent === parentID);
    const newSelectedItems = selectedItems.map(item => {
      if (item.documentID === boxItemDocumentID) {
        item.feedback = value;
      }
      return item;
    });
    this.setState({
      selectedItems: newSelectedItems,
    });
  };

  onSendFeedback = async parentID => {
    const {selectedItems} = this.state;
    let isPossibilityToSave = true;
    selectedItems.forEach(item => {
      if (!item.feedback) {
        isPossibilityToSave = false;
      }
    });

    if (!isPossibilityToSave || selectedItems.length === 0) {
      Utils.showAlert('', 'Please give feedback for all Items.');
      return;
    }

    this.setState({
      isLoading: true,
    });
    await saveFeedback(this.documentID, parentID, selectedItems);
    const newAllBoxes = await getUserBoxes(this.documentID);
    const newAllBoxItems = await this.fetchBoxItems(newAllBoxes);

    this.setState({
      isLoading: false,
      allBoxes: newAllBoxes,
      allBoxItems: newAllBoxItems,
    });
  };

  _renderContent = (content, index, isActive, sections) => {
    const {allBoxItems} = this.state;
    const parentId = content[DOCUMENT_ID];
    const isFeedbackSaved = content[BOX_FEEDBACK_SAVED];
    const matchedBoxItems = allBoxItems.find(ele => ele[0].parent === parentId);
    const createdTimeStamp = firebase.firestore.Timestamp.fromDate(
      content[BOX_CREATED_AT],
    ).seconds;
    const passedDate = Math.trunc(
      (firestoreNow - createdTimeStamp) / 3600 / 24,
    );
    const isFeedbackPossible = passedDate >= 14;
    let contentHeight = matchedBoxItems.length * 108;
    if (!isFeedbackSaved && isFeedbackPossible) {
      contentHeight += 90;
    }

    return (
      <Wrapper height={contentHeight}>
        <FlatList
          data={matchedBoxItems}
          renderItem={({item, itemIndex}) => (
            <BoxContent
              data={item}
              isFeedbackSaved={isFeedbackSaved}
              onSelectFeedback={this.onSelectFeedBack}
              isFeedbackPossible={isFeedbackPossible}
            />
          )}
          keyExtractor={(item, itemIndex) => 'item_' + itemIndex.toString()}
        />
        {!isFeedbackSaved && isFeedbackPossible ? (
          <FeedbackButton
            buttonText={'SEND FEEDBACK'}
            marginBottom={10}
            onPress={() => this.onSendFeedback(parentId)}
          />
        ) : null}
      </Wrapper>
    );
  };

  _updateSections = activeSections => {
    this.setState({activeSections});
  };

  //
  // Go back
  //
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {isLoading, allBoxes, activeSections} = this.state;
    const isExistedBoxes = allBoxes.length === 0 ? false : true;

    return (
      <Container>
        {isLoading ? (
          <Wrapper size={1} primary={'center'} secondary={'center'}>
            <Loading size={'large'} />
          </Wrapper>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <BackButton onPress={this.goBack} />
            {!isExistedBoxes ? null : <Title content={'Current box'} />}

            {!isExistedBoxes ? (
              <BoxStatusText content={"You don't have any box yet!"} />
            ) : (
              <Accordion
                sections={allBoxes}
                activeSections={activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                renderFooter={() => <BoxFooter />}
                onChange={this._updateSections}
                touchableComponent={TouchableOpacity}
                expandMultiple={false}
                duration={100}
              />
            )}
          </ScrollView>
        )}
      </Container>
    );
  }
}
