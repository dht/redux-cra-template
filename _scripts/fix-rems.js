const fs = require("fs");
const raw = fs.readFileSync("./src/semantic.scss").toString();

const regex = /([0-9]+[.0-9]*)rem/g;

const ratio = 14;

const output = raw.replace(regex, (all, match) => {
    const value = parseFloat(match);
    let newValue = Math.round(value * ratio * 1000) / 1000;
    if (newValue === 7000) {
        newValue = 500;
    }

    return newValue + "rem";
});

fs.writeFileSync("./src/semantic.output.scss", output);
