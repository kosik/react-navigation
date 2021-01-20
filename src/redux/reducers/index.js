import {createReducer, createActions} from 'reduxsauce';
import {INITIAL_STATE} from '../initialState';
import {static as Immutable} from 'seamless-immutable';

/** Action Types and Action Creators */
const {Types, Creators} = createActions(
  {
    login: ['data'],
    loginSuccess: ['response'],
    loginFailure: ['error'],
  },
  {},
);

export const Actions = Types;
export default Creators;

/** Reducers */
export const login = (state = INITIAL_STATE, action) => {
  return Immutable.merge(state, {fetching: true});
};

export const loginSuccess = (state = INITIAL_STATE, action) => {
  const {email} = action.response;

  return Immutable.merge(state, {
    email,
  });
};

export const loginFailure = (state = INITIAL_STATE, action) => {
  return Immutable.merge(state, {
    fetching: false,
    error: true,
    errorMessage: action.error,
  });
};

/** Hookup Reducers To Types */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
});
