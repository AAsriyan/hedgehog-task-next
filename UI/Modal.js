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
	return <div className={styles.card}>{props.children}</div>;
};

export default Modal;
