import types from "./modals.types";

export const toOptions = (arr = []) =>
    arr.map(item => ({ id: item, title: item }));

const dialog_1 = {
    index: 1,
    id: types.BASE,
    title: "Base dialog",
    fields: [
        {
            id: "title",
            title: "Title",
            type: "value",
        },
    ],
    selectorName: "$dialog_1_base",
};

export default {
    dialog_1,
    Dialog_1_Base: dialog_1,
};
