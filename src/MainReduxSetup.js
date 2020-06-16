import React, { Component } from 'react';

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./redux/RootReducer";
import rootSaga from "./redux/RootSagas";
import App from './screens/App';

const middleware = []
const enhancers = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)
enhancers.push(applyMiddleware(...middleware))

const createAppropriateStore = createStore
const store = createAppropriateStore(reducer, composeWithDevTools(...enhancers))

sagaMiddleware.run(rootSaga);

class MainReduxSetup extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
export default MainReduxSetup
