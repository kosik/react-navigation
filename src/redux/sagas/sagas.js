import {takeLatest, call, put} from 'redux-saga/effects';
// Actions
import {Actions} from '../reducers/index';
// APIs
import {login} from '../../services/boxAPIs';

export function* onLogin(api, payload) {
  try {
    const response = yield call(api, payload.data);
    if (response.ok) {
      yield put(Actions.loginSuccess(response.data));
    } else {
      yield put(Actions.loginFailure(response.data.message));
    }
  } catch (error) {
    yield put(Actions.loginFailure(error.message));
  }
}

/* ------------- Connect Types To Sagas ------------- */
export default [takeLatest(Actions.SIGN_UP_USING_PHONE, onLogin, login)];
