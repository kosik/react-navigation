import {all} from 'redux-saga/effects';
import allSagas from './sagas';

export default function* sagas() {
  yield all([...allSagas]);
}
