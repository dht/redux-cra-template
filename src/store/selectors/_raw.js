const createSelector = require("reselect").createSelector;

const $i = state => state || {};
const $appState = createSelector( $i, state => state.appState || {}); // prettier-ignore
const $todos = createSelector( $i, state => state.todos || {}); // prettier-ignore
const $modal = createSelector( $i, state => state.modal || {}); // prettier-ignore

module.exports = {
    $i,
    $appState,
    $todos,
    $modal,
};
