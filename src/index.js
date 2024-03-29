import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import View from './containers/View';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import connectToServer from './config/websocket';

connectToServer();

ReactDOM.render(
    <Provider store={store}>
        <View />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your View, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
