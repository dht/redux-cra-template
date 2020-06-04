const createSelector = require("reselect").createSelector;
const appState = require("./appState");
const modal = require("./modal");

const $app = createSelector(appState.$user, user => ({
    user,
}));

const $toast = createSelector(appState.$toast, toast => ({
    toast,
}));

const $rootModal = createSelector(modal.$modal, modal => ({
    modal: modal,
}));

module.exports = {
    $app,
    $toast,
    $rootModal,
};
