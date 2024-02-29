import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { State } from './reducers/state';
import { IAppState } from '../models/app-state';

export const store: Store<IAppState> = createStore(
  State,
  compose(
    applyMiddleware(reduxThunk),
  )
);