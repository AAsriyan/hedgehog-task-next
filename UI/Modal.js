import { Fragment } from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "../styles/Modal.module.css";

const Backdrop = (props) => {
	return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
	return (
		<div className={styles.modal}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};

const Modal = (props) => {
	const [_document, set_document] = useState(null);

	useEffect(() => {
		set_document(document);
	}, []);

	if (_document) {
		return (
			<Fragment>
				{ReactDOM.createPortal(
					<Backdrop onClose={props.onClose} />,
					_document.getElementById("modal-root")
				)}
				{ReactDOM.createPortal(
					<ModalOverlay>{props.children}</ModalOverlay>,
					_document.getElementById("modal-root")
				)}
			</Fragment>
		);
	} else {
		return null;
	}
};

export default Modal;
