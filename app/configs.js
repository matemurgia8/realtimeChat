import history from 'utils/history';
import configureStore from './configureStore';
import configureSocket from './configureSocket';

// Create redux store with history
const initialState = {};
export const store = configureStore(initialState, history);
export const socket = configureSocket(store.dispatch);
