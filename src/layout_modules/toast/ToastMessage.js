// @flow
import React from "react";
import "./ToastMessage.scss";
import classnames from "classnames";

const iconMap = {
    success: "done",
    warning: "info",
    error: "error",
    default: "done",
};

function ToastMessage(props) {
    const { type, show, text } = props;

    const animations = {
        fadeInRight: "fadeInRight",
        fadeOutRight: "fadeOutRight",
    };

    const icon = iconMap[type] || iconMap.default;
    const animation = show ? animations.fadeInRight : animations.fadeOutRight;

    const className = classnames(
        "ToastMessage-container animated",
        animation,
        type
    );

    return (
        <div className={className}>
            <div className="bar">
                <div className="filler" />
                <div className="icon">
                    <span className="material-icons">{icon}</span>
                </div>
            </div>
            <div className="content">
                <div className="text">{text}</div>
                <div className="icon">
                    <span onClick={props.close} className="material-icons">
                        close
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ToastMessage;
