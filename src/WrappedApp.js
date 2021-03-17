import {HashRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./app/store";
import App from "./App";
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>
);