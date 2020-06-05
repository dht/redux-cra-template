import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/AppContainer";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createBrowserHistory } from "history";
import globals from "./utils/globals";
import "./icons";
import * as serviceWorker from "./serviceWorker";
import { Provider as ProviderFluent, themes } from "@fluentui/react-northstar";

globals.history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <ProviderFluent theme={themes.teams}>
            <Router history={globals.history}>
                <Switch>
                    <Route path="/" exact={true} component={App} />
                </Switch>
            </Router>
        </ProviderFluent>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
