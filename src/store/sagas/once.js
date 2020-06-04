import { take, call } from "redux-saga/effects";

const getOnce = () => {
    let promises = [];

    return Promise.all(promises).then(results => {
        return {
            data: results[0],
        };
    });
};

function* once() {
    while (true) {
        console.log("saga once -> ", true);
        yield take("ONCE");
        console.log("saga once invoked -> ", true);
        const response = yield call(getOnce);
        console.log("response -> ", response);
    }
}

export default once;
