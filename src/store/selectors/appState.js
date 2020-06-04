const createSelector = require("reselect").createSelector;
const _raw = require("./_raw");

const $toast = createSelector(_raw.$appState, appState => appState.toast);
const $user = createSelector(_raw.$appState, appState => appState.user);

module.exports = {
    $toast,
    $user,
};
