import firebase from 'react-native-firebase';
import * as Utils from '../utils';
// Load FIRESTORE_KEYS constants
import {FIRESTORE_KEYS, FEEDBACK, LOCAL_STORAGE} from '../constants/vals';

const {
  STORAGE_NAME,

  DOCUMENT_ID,

  EMAIL,
  SHIRT_SIZE,
  DENIM_SIZE,
  STYLE_TEXT,
  INSPIRATION_TEXT,
  PHOTO_URL,

  BOX_CREATED_AT,
  BOX_FEEDBACK_SAVED,

  PRODUCT_NAME,
  PRODUCT_DESCRIPTION,
  PRODUCT_FEEDBACK,
  PRODUCT_SERIAL,
  IMGAE_URL,

  COLLECTION_USERS,
  COLLECTION_BOXES,
  COLLECTION_ITEMS,
  COLLECTION_PHOTOS,

  COLLECTION_GOOD,
  COLLECTION_NOT_MY_STYLE,
  COLLECTION_TOO_BIG,
  COLLECTION_TOO_SMALL,
  COLLECTION_KEPT_ONE_MONTH,
  COLLECTION_KEPT_SIX_MONTHS,
} = FIRESTORE_KEYS;
const {
  FEEDBACK_GOOD,
  FEEDBACK_NOT_MY_STYLE,
  FEEDBACK_TOO_BIG,
  FEEDBACK_TOO_SMALL,
  FEEDBACK_KEPT_ONE_MONTH,
  FEEDBACK_KEPT_SIX_MONTHS,
} = FEEDBACK;
const {FCM_TOKEN} = LOCAL_STORAGE;

// Get Auth instance
const authInstance = firebase.auth();
// Get users collection ref
const usersCollectionRef = firebase.firestore().collection(COLLECTION_USERS);

//
// For Login screen
//
const signInWithEmailAndPassword = (email, password) => {
  return authInstance.signInWithEmailAndPassword(email, password);
};

const signOut = () => {
  return authInstance.signOut();
};

const onAuthStateChanged = listner => {
  authInstance.onAuthStateChanged(listner);
};

const createUserWithEmailAndPassword = (email, password) => {
  return authInstance.createUserWithEmailAndPassword(email, password);
};

const addNewUser = (email, fcmToken) => {
  return usersCollectionRef.add({
    email,
    fcmToken,
  });
};

const sendCode = email => {
  return authInstance.sendPasswordResetEmail(email);
};

const confirmPasswordReset = (code, newPassword) => {
  return authInstance.confirmPasswordReset(code, newPassword);
};

//
// For Profile screen
//
const updateFCMToken = (documentID, fcmToken) => {
  return usersCollectionRef.doc(documentID).update({fcmToken});
};

const getUserData = async (emailAddress, fcmToken) => {
  try {
    const querySnapshot = await usersCollectionRef
      .where(EMAIL, '==', emailAddress)
      .get();

    const documentsSnapshots = querySnapshot.docs;
    if (documentsSnapshots.length > 0) {
      const document = documentsSnapshots[0];

      // Shirt size, Denim size, Style and Inspiration Text
      const shirtSize = document.get(SHIRT_SIZE) || '';
      const denimSize = document.get(DENIM_SIZE) || '';
      const styleText = document.get(STYLE_TEXT) || '';
      const inspirationText = document.get(INSPIRATION_TEXT) || '';
      const tokenID = document.get(FCM_TOKEN) || '';
      const documentID = document.id;

      // Update fcmToken
      if (fcmToken !== tokenID) {
        await updateFCMToken(documentID, fcmToken);
      }

      // Get photos
      const photosQuerySnapshot = await usersCollectionRef
        .doc(documentID)
        .collection(COLLECTION_PHOTOS)
        .get();
      const photoDocuments = photosQuerySnapshot.docs;

      // Calc max photo page: each page has 9 photos
      let maxPhotoPage = Math.ceil(photoDocuments.length / 9);
      if (photoDocuments.length % 9 === 0) {
        maxPhotoPage = photoDocuments.length / 9 + 1;
      }

      // Create photo array
      const loopArray = Utils.generateNumberArray(maxPhotoPage * 9);
      const allPhotos = loopArray.map((ele, index) => {
        let photoURL = '';
        let isUploaded = false;
        let photoDocumentID = '';

        if (index < photoDocuments.length) {
          photoDocumentID = photoDocuments[index].id;
          photoURL = photoDocuments[index].get(PHOTO_URL);
          isUploaded = true;
        }
        return {
          photoDocumentID,
          photoURL,
          isUploaded,
          isUploading: false,
        };
      });

      // console.log('allPhotos ======== >>>>>>', allPhotos);

      return {
        shirtSize,
        savedShirtSize: shirtSize,
        denimSize,
        savedDenimSize: denimSize,
        styleText,
        savedStyleText: styleText,
        inspirationText,
        savedInspirationText: inspirationText,

        documentID,

        allPhotos,
      };
    } else {
      return null;
    }
  } catch (error) {
    // console.log('error getUserData ===>>>', error);
    return null;
  }
};

const updateUserdata = (documentID, userData) => {
  return usersCollectionRef.doc(documentID).update(userData);
};

const getUserProfileData = async documetnID => {
  const userDocument = await usersCollectionRef.doc(documetnID).get();
  return userDocument.data();
};

const uploadPhoto = async (selectedImages, documentID) => {
  try {
    /**
     * Uploading phtos to the storage
     *
     */
    const uploadedImageUrlsPromiseArray = selectedImages.map((image, key) => {
      // Obtain the extension of the photo
      const mimeSplit = image.mime.split('/');
      const extension = mimeSplit[1];

      // The url for uploading to the Storage
      const uploadingUrl = image.path;
      const imageRef = firebase
        .storage()
        .ref(`/${STORAGE_NAME}/` + Utils.guid() + '.' + extension);

      // Upload the photo to the storage and return the uploaded URL
      return imageRef.put(uploadingUrl).then(() => {
        return imageRef.getDownloadURL();
      });
    });
    const uploadedImageUrls = await Promise.all(uploadedImageUrlsPromiseArray);

    /**
     * Add the photo url to the photos collection of the specific user
     *
     */
    const photosCollectionRef = usersCollectionRef
      .doc(documentID)
      .collection(COLLECTION_PHOTOS);
    const addedPromiseArray = uploadedImageUrls.map((ele, key) => {
      return photosCollectionRef
        .add({
          photoURL: ele,
          createdAt: new Date(),
        })
        .then(docRef => {
          return docRef.get();
        });
    });
    return await Promise.all(addedPromiseArray);
  } catch (error) {
    // console.log('error uploadedImageUrls ===>', error);
  }
};

const addPhotoToUser = (documentID, photoURL) => {
  return usersCollectionRef
    .doc(documentID)
    .collection(COLLECTION_PHOTOS)
    .add({
      photoURL,
      createdAt: new Date(),
    });
};

const deletePhotoFromUser = (documentID, photoDocumentID) => {
  return usersCollectionRef
    .doc(documentID)
    .collection(COLLECTION_PHOTOS)
    .doc(photoDocumentID)
    .delete();
};

//
// For Feedback Screen
//
const getUserBoxes = async documentID => {
  try {
    const querySnapshot = await usersCollectionRef
      .doc(documentID)
      .collection(COLLECTION_BOXES)
      .orderBy(BOX_CREATED_AT, 'desc')
      .get();
    const documentsSnapshots = querySnapshot.docs;
    const allBoxes = documentsSnapshots.map((document, index) => {
      let box = {};
      box[DOCUMENT_ID] = document.id;
      box[BOX_CREATED_AT] = document.get(BOX_CREATED_AT).toDate();
      box[BOX_FEEDBACK_SAVED] = document.get(BOX_FEEDBACK_SAVED);
      return box;
    });
    // console.log('allBoxes ===> ', allBoxes);
    return allBoxes;
  } catch (error) {
    // console.log('error getUserBoxes ===> ', error);
  }
};

const getCountOfActiveBoxes = async documentID => {
  try {
    const querySnapshot = await usersCollectionRef
      .doc(documentID)
      .collection(COLLECTION_BOXES)
      .orderBy(BOX_CREATED_AT, 'desc')
      .get();
    const documentsSnapshots = querySnapshot.docs;

    let count = 0;
    documentsSnapshots.forEach((document, index) => {
      const isRecivingFeedback = document.get(BOX_FEEDBACK_SAVED);
      if (!isRecivingFeedback) {
        count++;
      }
    });
    return count;
  } catch (error) {
    // console.log('error getUserBoxes ===> ', error);
  }
};

const getBoxItems = async (documentID, boxDocumentID) => {
  try {
    const querySnapshot = await usersCollectionRef
      .doc(documentID)
      .collection(COLLECTION_BOXES) // boxes collection
      .doc(boxDocumentID) // box document id
      .collection(COLLECTION_ITEMS) // items collection
      .orderBy(PRODUCT_SERIAL, 'ASC')
      .get();
    const documentsSnapshots = querySnapshot.docs;
    const allBoxItems = documentsSnapshots.map((document, index) => {
      let boxItem = {};
      // Get box info
      boxItem.parent = boxDocumentID;
      boxItem[DOCUMENT_ID] = document.id;
      boxItem[IMGAE_URL] = document.get(IMGAE_URL);
      boxItem[PRODUCT_NAME] = 'item' + '#' + document.get(PRODUCT_SERIAL);
      boxItem[PRODUCT_DESCRIPTION] = document.get(PRODUCT_DESCRIPTION);
      boxItem[PRODUCT_FEEDBACK] = document.get(PRODUCT_FEEDBACK);

      // Get box items
      return boxItem;
    });

    // console.log('allBoxItems ===> ', allBoxItems);
    return allBoxItems;
  } catch (error) {
    // console.log('error getUserBoxes ===> ', error);
  }
};

const saveFeedback = async (documentID, parentID, selectedItems) => {
  // Update the feedbackSaved filed of Box to true
  try {
    await usersCollectionRef
      .doc(documentID)
      .collection(COLLECTION_BOXES) // boxes collection
      .doc(parentID) // box document id
      .update({
        feedbackSaved: true,
      });
  } catch (error) {
    // console.log('error upadate feedbackSaved ===> ', error);
  }

  // Add items to the specific category
  const addingItemsPromise = selectedItems.map((item, key) => {
    return usersCollectionRef
      .doc(documentID)
      .collection(item.feedback)
      .add({
        documentID: item.documentID,
        imageURL: item.imageURL,
      });
  });

  // Update the feedback of Box item
  const updatingFeedbackPromise = selectedItems.map((item, key) => {
    let feedbackString = '';
    switch (item.feedback) {
      case COLLECTION_GOOD:
        feedbackString = FEEDBACK_GOOD;
        break;
      case COLLECTION_NOT_MY_STYLE:
        feedbackString = FEEDBACK_NOT_MY_STYLE;
        break;
      case COLLECTION_TOO_BIG:
        feedbackString = FEEDBACK_TOO_BIG;
        break;
      case COLLECTION_TOO_SMALL:
        feedbackString = FEEDBACK_TOO_SMALL;
        break;
      case COLLECTION_KEPT_ONE_MONTH:
        feedbackString = FEEDBACK_KEPT_ONE_MONTH;
        break;
      case COLLECTION_KEPT_SIX_MONTHS:
        feedbackString = FEEDBACK_KEPT_SIX_MONTHS;
        break;
      default:
        break;
    }

    return usersCollectionRef
      .doc(documentID)
      .collection(COLLECTION_BOXES) // boxes collection
      .doc(parentID) // box documentID
      .collection(COLLECTION_ITEMS)
      .doc(item.documentID) // box item documentID
      .update({
        feedback: feedbackString,
      });
  });

  const allPromise = [...addingItemsPromise, ...updatingFeedbackPromise];

  return await Promise.all(allPromise);
};

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  addNewUser,
  deletePhotoFromUser,
  sendCode,
  confirmPasswordReset,
  getUserData,
  updateUserdata,
  uploadPhoto,
  addPhotoToUser,
  getUserBoxes,
  getCountOfActiveBoxes,
  getBoxItems,
  // getSpecificItems,
  saveFeedback,
  getUserProfileData,
};
