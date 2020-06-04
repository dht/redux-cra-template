import React, { useEffect } from "react";
import "./Dialog.scss";
import Modal from "../modal/Modal";
import { useSetState } from "react-use";
import { Button } from "semantic-ui-react";

function Dialog(props) {
    const [data, setData] = useSetState(props.data);
    const { config, isLast, className } = props;
    const { id, title, isWide, allowEscape = true, fields } = config || {};

    useEffect(() => {
        setData(props.data);
    }, [props.data, setData]);

    function onSave() {
        props.onSave(data);
        props.onClose();
    }

    function renderField(field) {
        const { id, title } = field;
        return (
            <div className="field" key={id}>
                <label>{title}</label>
                <input defaultValue={data[id]}></input>
            </div>
        );
    }

    function renderFields() {
        return fields.map(renderField);
    }

    function renderActions() {
        return (
            <div className="dialog-actions">
                <Button onClick={onSave}>Save</Button>
                <Button onClick={props.onClose}>Cancel</Button>
            </div>
        );
    }

    return (
        <Modal
            className={className}
            simple
            isLast={isLast}
            data-testid={id}
            isWide={isWide}
            allowEscape={allowEscape}
        >
            <div className="Dialog-container">
                <div className="dialog-header">
                    <h1>{title}</h1>
                </div>
                <div className="dialog-content">{renderFields()}</div>
                {renderActions()}
            </div>
        </Modal>
    );
}

Dialog.propTypes = {};

Dialog.defaultProps = {};

export default Dialog;
