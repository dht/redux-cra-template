// Shortcuts: reda
const clipboardy = require("clipboardy");
const reducers = require("../src/utils/generateReducers");

const args = process.argv.slice(2);
const single = args[0];
let plural = (args[1] || "").trim();

const start = async () => {
    if (plural.indexOf("/") >= 0) {
        plural = "";
    }

    const config = {
        single,
        plural,
        type: plural ? "COLLECTION" : "SINGLE",
    };

    const output = reducers.generateActionsFile({ config });
    clipboardy.writeSync(output);
};

start();
