// @flow
import React from "react";
import "./Loader.scss";
import LoaderImage from "./loader.svg";

function Loader(props) {
    const { size } = props;

    return (
        <div className="Loader-container">
            <img src={LoaderImage} alt="Loader" width={size} />
        </div>
    );
}

export default Loader;
