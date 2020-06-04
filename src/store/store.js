import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import root_middleware from "./middlewares/storeMiddlewares";
import initialState from "./initialState";
import reducers from "./reducers/storeReducers";
import sagas from "./sagas/storeSagas";
import { saga_runner, setAll } from "../utils/hooks/useSaga";
import globals from "../utils/globals";

globals.sagas = createSagaMiddleware();

const mainApp = combineReducers(reducers);
const middlewares = [globals.sagas, root_middleware];

export const store = createStore(
    mainApp,
    initialState,
    compose(
        applyMiddleware.apply(this, middlewares),
        window && window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
);

globals.dispatch = store.dispatch;
globals.sagas.run(saga_runner);
globals.store = store;
setAll(sagas);

["once"]
    .filter(i => i)
    .forEach(id => store.dispatch({ type: "SAGA_START", id }));

export default store;
