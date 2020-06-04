import { take } from "redux-saga/effects";

function* listen() {
    while (true) {
        console.log("saga listen -> ", true);
        yield take("LISTEN");
        console.log("saga listen invoked -> ", true);
    }
}

export default listen;
