const createSelector = require("reselect").createSelector;
const _raw = require("./_raw");

const $dialog_1 = createSelector(_raw.$i, state => ({
    title: "Title",
}));

module.exports = {
    $dialog_1_base: $dialog_1,
};
