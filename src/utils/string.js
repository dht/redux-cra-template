/**
 * String manipulation
 */
const camelCase = require("lodash/camelCase");
const startCase = require("lodash/startCase");

const lz = (number, min = 2) => {
    let output = String(number);

    while (output.length < min) {
        output = "0" + output;
    }

    return output;
};

const ls = (str, min = 2, char = " ") => {
    let output = String(str);

    while (output.length < min) {
        output = output + char;
    }

    return output;
};

const multi = (char, min = 2) => {
    let output = "";

    while (output.length < min) {
        output = output + char;
    }

    return output;
};

const titleCase = str => {
    return startCase(camelCase(str));
};

const replaceLast = (str, find = "", replace) => {
    const index = str.lastIndexOf(find);
    const len = find.length;
    return str.substr(0, index) + replace + str.substr(index + len);
};

module.exports = {
    lz,
    ls,
    titleCase,
    replaceLast,
    multi,
};
