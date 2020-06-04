/**
 * Global state
 */
let history, dispatch, sagas, store;

module.exports = {
    get history() {
        return history;
    },
    set history(value) {
        history = value;
    },
    get dispatch() {
        return dispatch;
    },
    set dispatch(value) {
        dispatch = value;
    },
    get sagas() {
        return sagas;
    },
    set sagas(value) {
        sagas = value;
    },
    get store() {
        return store;
    },
    set store(value) {
        store = value;
    },
};
