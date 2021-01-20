import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';
import reducers from '../redux/reducers';
import sagas from '../redux/sagas';

const persistConfig = {
  key: 'root',
  debug: true,
  timeout: 0,
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});
const middlewares = [sagaMiddleware, loggerMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(persistedReducer, {}, compose(...enhancers));
// sagaMiddleware.run(sagas);
export default store;
