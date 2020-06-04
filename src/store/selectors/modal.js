const createSelector = require("reselect").createSelector;
const _raw = require("./_raw");

const $modal = createSelector(_raw.$modal, modal => modal);

const $lastModal = createSelector($modal, modal => {
    return modal[modal.length - 1];
});

module.exports = {
    $modal,
    $lastModal,
};
