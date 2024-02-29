
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/app-store';
import { AppContainer } from './containers/app-container';
import './css/bootstrap.min.css';
import './css/common.scss';

export default class App extends React.Component {
    render() {
        return(
          <Provider store={store}>
            <AppContainer />
          </Provider>      
        )
    }
};