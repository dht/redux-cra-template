// @flow
import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";
import Icon from "../icon/Icon";
import classnames from "classnames";
import Button from "../button/Button";
import globals from "../../utils/globals";
import delay from "../../utils/delay";

const noop = () => {};

export class Modal extends Component {
    static defaultProps = {
        onClose: noop,
        beforeClose: noop,
    };

    constructor() {
        super();
        this.modalContainer = React.createRef();
        this.modal = React.createRef();
    }

    state = {
        show: true,
        showOverlay: false, // for easing in the overlay
    };

    get isLast() {
        const { isLast } = this.props;
        return isLast;
    }

    click = ev => {
        if (this.waiting) return;

        if (
            !this.props.noDismiss &&
            !this.props.onExit &&
            !this.modal.current.contains(ev.target)
        ) {
            this.onClose();
        }
    };

    keyDown = ev => {
        if (this.waiting) return;
        if (!this.props.noDismiss && ev.which === 27) {
            this.onClose();
        }
    };

    get bodyClasses() {
        return document.querySelector("body").classList;
    }

    async componentDidMount() {
        const { allowScroll } = this.props;

        document.addEventListener("mousedown", this.click);
        document.addEventListener("keydown", this.keyDown);

        if (!allowScroll) {
            this.bodyClasses.add("no-scroll");
        }

        this.setState({
            showOverlay: true,
        });
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.click);
        document.removeEventListener("keydown", this.keyDown);
        this.bodyClasses.remove("no-scroll");
    }

    onClose = async () => {
        if (this.props.onExit) {
            this.waiting = true;
            const ok = await this.props.onExit();
            this.waiting = false;
            if (!ok) return;
        }

        this.props.beforeClose();

        if (!this.isLast) return;

        const { isDetached } = this.props;

        this.setState({ show: false });
        await delay(100);
        this.setState({ showOverlay: false });
        await delay(400);

        if (isDetached) {
            this.props.onClose();
        } else {
            globals.dispatch({ type: "POP_MODAL" });
        }
    };

    renderButton = (button, index) => {
        let { title, isCancel, loading, disabled, color, testid } = button;

        if (!color) {
            color = isCancel ? "secondary" : "primary";
        }

        let method;

        if (isCancel) {
            method = () => {
                this.onClose();
                button.onClick();
            };
        } else {
            method = button.onClick;
        }

        return (
            <div className="btn" key={index}>
                <Button
                    data-testid={testid}
                    variant="outlined"
                    color={color}
                    onClick={method}
                    loading={loading}
                    disabled={disabled}
                >
                    {title}
                </Button>
            </div>
        );
    };

    renderButtons() {
        const { buttons } = this.props;
        if (!buttons) return null;
        return <div className="actions">{buttons.map(this.renderButton)}</div>;
    }

    renderError() {
        const { errorMessage } = this.props;

        if (!errorMessage) return null;

        return <div className="error">{errorMessage}</div>;
    }

    renderInner() {
        const { header, simple } = this.props;
        const { show, showOverlay } = this.state;

        const classNameOverlay = classnames("overlay", {
            show: showOverlay,
        });

        const classNameModal = classnames(
            "modal animated ",
            this.props.className,
            {
                fadeOut: !show,
                simple,
            }
        );

        return (
            <div className="Modal-container" ref={this.modalContainer}>
                <div className={classNameOverlay} />
                <div className="content">
                    <div
                        className={classNameModal}
                        ref={this.modal}
                        data-testid={this.props["data-testid"]}
                    >
                        {!this.props.noDismiss ? (
                            <div className="close">
                                <Icon
                                    name="close"
                                    size={28}
                                    onClick={this.onClose}
                                    data-testid="close-modal"
                                />
                            </div>
                        ) : null}
                        <div className="header">{header}</div>
                        <div className="content">{this.props.children}</div>
                        {this.renderError()}
                        {this.renderButtons()}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return ReactDOM.createPortal(
            this.renderInner(),
            document.getElementById("modal")
        );
    }
}

export default Modal;
