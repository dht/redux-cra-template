/**
 * Generate reducers
 */

const titleCase = require("./string").titleCase;

const types = {
    SINGLE: "SINGLE",
    COLLECTION: "COLLECTION",
    QUEUE: "QUEUE",
};

const singleActions = name => ({
    set: `SET_${name.toUpperCase()}`,
    patch: `PATCH_${name.toUpperCase()}`,
    delete: `DELETE_${name.toUpperCase()}`,
});

const pluralActions = name => ({
    set: `SET_${name.toUpperCase()}`,
    patch: `PATCH_${name.toUpperCase()}`,
});

const queueActions = name => ({
    add: `ADD_${name.toUpperCase()}`,
    pop: `POP_${name.toUpperCase()}`,
    clear: `CLEAR_${name.toUpperCase()}S`,
});

const generateSingle = name_single => {
    const actions = singleActions(name_single);

    const single = (state = {}, action) => {
        switch (action.type) {
            case actions.set:
                return action.value;

            case actions.patch:
                return {
                    ...state,
                    ...action.value,
                };

            default:
                return state;
        }
    };

    return single;
};

const generateCollection = (name_single, name_plural) => {
    const actions = {
        single: singleActions(name_single),
        plural: pluralActions(name_plural),
    };

    const item = generateSingle(name_single);

    const collection = (state = {}, action) => {
        let newState;

        switch (action.type) {
            case actions.plural.set:
                return action.value;

            case actions.plural.patch:
                return {
                    ...state,
                    ...action.value,
                };

            case actions.single.set:
            case actions.single.patch:
                return {
                    ...state,
                    [action.id]: item(state[action.id], action),
                };

            case actions.single.delete:
                newState = { ...state };
                delete newState[action.id];
                return newState;

            default:
                return state;
        }
    };

    return collection;
};

const generateQueue = name_single => {
    const actions = queueActions(name_single);

    const queue = (state = [], action) => {
        let newState;

        switch (action.type) {
            case actions.add:
                return [...state, action.value];

            case actions.pop:
                newState = [...state];
                newState.pop();
                return newState;

            case actions.clear:
                return [];

            default:
                return state;
        }
    };

    return queue;
};

const generate = reducerConfig => {
    const { single, plural, type } = reducerConfig;

    switch (type) {
        case types.SINGLE:
            return generateSingle(single);
        case types.COLLECTION:
            return generateCollection(single, plural);
        case types.QUEUE:
            return generateQueue(single);
        default:
    }
};

const generateAll = config => {
    return Object.keys(config).reduce((output, key) => {
        const reducer = config[key];
        output[key] = generate(reducer);
        return output;
    }, {});
};

const templates = {
    singleSet: (name) => `export const set${titleCase(name)} = value => ({ type: "SET_${name.toUpperCase()}", value }); // prettier-ignore`, // prettier-ignore
    singlePatch: (name) => `export const patch${titleCase(name)} = value => ({ type: "PATCH_${name.toUpperCase()}", value }); // prettier-ignore`, // prettier-ignore
    queueAdd: (name) => `export const add${titleCase(name)} = value => ({ type: "ADD_${name.toUpperCase()}", value }); // prettier-ignore`, // prettier-ignore
    queuePop: (name) => `export const pop${titleCase(name)} = () => ({ type: "POP_${name.toUpperCase()}" }); // prettier-ignore`, // prettier-ignore
    collectionSetAll: (plural) => `export const set${titleCase(plural)} = value => ({ type: "SET_${plural.toUpperCase()}", value }); // prettier-ignore`, // prettier-ignore
    collectionSetOne: (single) => `export const set${titleCase(single)} = (id, value) => ({ type: "SET_${single.toUpperCase()}", id, value }); // prettier-ignore`, // prettier-ignore
    collectionPatchOne: (single) => `export const patch${titleCase(single)} = (id, value) => ({ type: "PATCH_${single.toUpperCase()}", id, value }); // prettier-ignore`, // prettier-ignore
    collectionDeleteOne: (single) => `export const delete${titleCase(single)} = id => ({ type: "DELETE_${single.toUpperCase()}", id }); // prettier-ignore` // prettier-ignore
};

const generateActionsFile = config => {
    return Object.keys(config)
        .reduce((output, key) => {
            const { single, plural, type } = config[key];

            switch (type) {
                case types.SINGLE:
                    output.push(templates.singleSet(single));
                    output.push(templates.singlePatch(single));
                    break;
                case types.COLLECTION:
                    output.push(templates.collectionSetAll(plural));
                    output.push(templates.collectionSetOne(single));
                    output.push(templates.collectionPatchOne(single));
                    output.push(templates.collectionDeleteOne(single));
                    break;
                case types.QUEUE:
                    output.push(templates.queueAdd(single));
                    output.push(templates.queuePop(single));
                    break;
                default:
            }

            output.push("");

            return output;
        }, [])
        .join("\n");
};

module.exports = {
    types,
    generateSingle,
    generateCollection,
    generateQueue,
    generate,
    generateAll,
    generateActionsFile,
};
