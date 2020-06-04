import React from "react";
import "./App.scss";
import ToastContainer from "./components/ToastContainer";
import RootModalContainer from "./components/RootModalContainer";
import Fa from "./layout_modules/fa/Fa";
import { Button } from "semantic-ui-react";

function App(props) {
    const { user } = props,
        { name } = user;

    return (
        <div className="App-container">
            <h1>Site</h1>
            <Button onClick={props.showToast}>Show toast</Button>
            <Button onClick={props.openDialog}>Show dialog</Button>
            <p>name: {name}</p>
            <p>You can press F2 to trigger an onKey</p>
            <p>Icons</p>
            <Fa family={"fab"} icon={"aws"} />
            <i className="material-icons">extension</i>
            <ToastContainer />
            <RootModalContainer />
        </div>
    );
}

export default App;
