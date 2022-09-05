import styles from "../styles/Modal.module.css";

const Modal = (props) => {
	return <div className={styles.card}>{props.children}</div>;
};

export default Modal;
